import {useCallback, useEffect, useRef, useState} from "react";
import {BATTLE_WS_URL} from "./constants.ts";
import type {BattleView, Choice, ErrorCode, LogEntry, RoomPhase, ServerMessage, SideID} from "./protocol.ts";
import {clearBattleSession, loadBattleSession} from "./session.ts";
import type {ConnectionStatus} from "./useBattleSocket.ts";
import {useBattleSocket} from "./useBattleSocket.ts";

export type LogSpeed = 'instant' | 'fast' | 'normal';

const SPEED_INTERVAL_MS: Record<LogSpeed, number> = {
    instant: 0,
    fast: 120,
    normal: 350,
};

export interface RevealedLogLine extends LogEntry {
    id: number;
}

interface RoomStateInfo {
    phase: RoomPhase;
    players: Partial<Record<SideID, string>>;
}

interface ViewBatch {
    log: LogEntry[];
    view: BattleView;
}

export interface UseBattleViewResult {
    status: ConnectionStatus;
    sessionValid: boolean;
    roomState: RoomStateInfo | null;
    view: BattleView | null;
    log: RevealedLogLine[];
    isRevealing: boolean;
    error: { code: ErrorCode; message: string } | null;
    dismissError: () => void;
    canChoose: boolean;
    sendChoice: (choice: Choice) => void;
    speed: LogSpeed;
    setSpeed: (speed: LogSpeed) => void;
    skipReveal: () => void;
    leave: () => void;
}

/**
 * The whole of the client's battle logic: owns the connection + resume
 * handshake (moved out of BattleRoom.tsx unchanged from Phase 3), and
 * layers a paced reveal on top of the server's `{log, view}` batches so the
 * log reads out a few lines at a time instead of a whole turn appearing at
 * once. A BattleView is a full snapshot, not a delta, so "pacing" just
 * means delaying when the displayed view swaps to the next one - nothing
 * here simulates anything the server hasn't already resolved.
 */
export function useBattleView(code: string | undefined): UseBattleViewResult {
    const [seatToken] = useState(() => loadBattleSession());
    const sessionValid = !!code && seatToken?.code === code;

    const [roomState, setRoomState] = useState<RoomStateInfo | null>(null);
    const [view, setView] = useState<BattleView | null>(null);
    const [log, setLog] = useState<RevealedLogLine[]>([]);
    const [isRevealing, setIsRevealing] = useState(false);
    const [error, setError] = useState<{ code: ErrorCode; message: string } | null>(null);
    const [speed, setSpeed] = useState<LogSpeed>('normal');
    const [respondedRqid, setRespondedRqid] = useState<number | null>(null);

    const queueRef = useRef<ViewBatch[]>([]);
    const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const nextLogIdRef = useRef(0);
    const speedRef = useRef(speed);
    speedRef.current = speed;

    const clearRevealTimer = useCallback(() => {
        if (revealTimerRef.current !== null) {
            clearTimeout(revealTimerRef.current);
            revealTimerRef.current = null;
        }
    }, []);

    // Reveals the first queued batch's log lines one at a time on an
    // interval, then swaps `view` to that batch's view and moves on to
    // whatever's next in the queue (if anything arrived meanwhile).
    const processQueue = useCallback(() => {
        const batch = queueRef.current[0];
        if (!batch) {
            setIsRevealing(false);
            return;
        }
        setIsRevealing(true);

        const revealNext = (index: number) => {
            if (index >= batch.log.length) {
                queueRef.current.shift();
                setView(batch.view);
                processQueue();
                return;
            }
            const entry = batch.log[index];
            setLog(prev => [...prev, {...entry, id: nextLogIdRef.current++}]);
            revealTimerRef.current = setTimeout(() => revealNext(index + 1), SPEED_INTERVAL_MS[speedRef.current]);
        };
        revealNext(0);
    }, []);

    const skipReveal = useCallback(() => {
        clearRevealTimer();
        const newEntries: RevealedLogLine[] = [];
        let lastView: BattleView | null = null;
        for (const batch of queueRef.current) {
            for (const entry of batch.log) newEntries.push({...entry, id: nextLogIdRef.current++});
            lastView = batch.view;
        }
        queueRef.current = [];
        if (newEntries.length) setLog(prev => [...prev, ...newEntries]);
        if (lastView) setView(lastView);
        setIsRevealing(false);
    }, [clearRevealTimer]);

    const handleMessage = useCallback((message: ServerMessage) => {
        if (message.t === 'roomState') {
            setRoomState({phase: message.phase, players: message.players});
            return;
        }
        if (message.t === 'update' || message.t === 'end') {
            const wasEmpty = queueRef.current.length === 0;
            queueRef.current.push({log: message.t === 'update' ? message.log : [], view: message.view});
            if (wasEmpty) processQueue();
            return;
        }
        if (message.t === 'error') {
            setError({code: message.code, message: message.message});
            // A rejected choice leaves the same rqid live - let the player
            // pick again instead of being stuck with disabled controls.
            if (message.code === 'invalid_choice') setRespondedRqid(null);
            if (message.code === 'invalid_seat_token' || message.code === 'room_not_found') clearBattleSession();
        }
    }, [processQueue]);

    const {status, send} = useBattleSocket(sessionValid ? BATTLE_WS_URL : null, handleMessage);

    useEffect(() => {
        if (status === 'open' && sessionValid && seatToken && code) {
            send({t: 'resume', code, seatToken: seatToken.seatToken});
        }
    }, [status, sessionValid, seatToken, code, send]);

    useEffect(() => {
        return () => clearRevealTimer();
    }, [clearRevealTimer]);

    const canChoose = !isRevealing && view?.request != null && view.request.rqid !== respondedRqid;

    const sendChoice = useCallback((choice: Choice) => {
        if (isRevealing || !view?.request || view.request.rqid === respondedRqid) return;
        const rqid = view.request.rqid;
        setRespondedRqid(rqid);
        send({t: 'choose', rqid, choice});
    }, [isRevealing, view, respondedRqid, send]);

    const dismissError = useCallback(() => setError(null), []);

    const leave = useCallback(() => {
        send({t: 'leave'});
        clearBattleSession();
    }, [send]);

    return {
        status, sessionValid, roomState, view, log, isRevealing, error, dismissError,
        canChoose, sendChoice, speed, setSpeed, skipReveal, leave,
    };
}
