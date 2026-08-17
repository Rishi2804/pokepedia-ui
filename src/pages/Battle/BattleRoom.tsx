import {Alert, Box, Button, Chip, LinearProgress, Typography} from "@mui/material";
import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {BATTLE_WS_URL} from "../../services/battle/constants.ts";
import type {BattleView, RoomPhase, ServerMessage, SideID} from "../../services/battle/protocol.ts";
import {clearBattleSession, loadBattleSession} from "../../services/battle/session.ts";
import {useBattleSocket} from "../../services/battle/useBattleSocket.ts";
import {FormPaper} from "./styles.ts";

/**
 * Route /battle/:code. Owns the connection + resume handshake and renders a
 * minimal status view - enough to prove the room/team-preview pipeline
 * works end to end (Phase 3's scope). The themed battle scene that replaces
 * this rendering, driven by the same BattleView, is Phase 4/5.
 */
const BattleRoom: FC = () => {
    const {code} = useParams<{ code: string }>();
    const navigate = useNavigate();
    const [seatToken] = useState(() => loadBattleSession());
    const [roomState, setRoomState] = useState<{ phase: RoomPhase; players: Partial<Record<SideID, string>> } | null>(null);
    const [view, setView] = useState<BattleView | null>(null);
    const [log, setLog] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const sessionValid = !!code && seatToken?.code === code;

    const handleMessage = useCallback((message: ServerMessage) => {
        if (message.t === 'roomState') {
            setRoomState({phase: message.phase, players: message.players});
        } else if (message.t === 'update') {
            setView(message.view);
            setLog(prev => [...prev, ...message.log]);
        } else if (message.t === 'end') {
            setView(message.view);
        } else if (message.t === 'error') {
            setError(`${message.code}: ${message.message}`);
            if (message.code === 'invalid_seat_token' || message.code === 'room_not_found') {
                clearBattleSession();
            }
        }
    }, []);

    const {status, send} = useBattleSocket(sessionValid ? BATTLE_WS_URL : null, handleMessage);

    useEffect(() => {
        if (status === 'open' && sessionValid && seatToken && code) {
            send({t: 'resume', code, seatToken: seatToken.seatToken});
        }
    }, [status, sessionValid, seatToken, code, send]);

    if (!sessionValid) {
        return (
            <Box sx={{paddingY: 3}}>
                <MetaData pageTitle={`Battle ${code ?? ''} | PokePedia`}/>
                <FormPaper>
                    <Alert severity="warning">
                        No active session for room {code}. If you have the code, join it from the Battle page.
                    </Alert>
                    <Button sx={{marginTop: 2}} variant="contained" onClick={() => navigate('/battle')}>
                        Back to Battle
                    </Button>
                </FormPaper>
            </Box>
        );
    }

    return (
        <Box sx={{paddingY: 3}}>
            <MetaData pageTitle={`Battle ${code} | PokePedia`}/>
            <Typography variant="h1" sx={{textAlign: "center", marginBottom: 1}}>Room {code}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", marginBottom: 3}}>
                Connection: {status}
            </Typography>

            {status === 'connecting' && <LinearProgress sx={{marginBottom: 3}}/>}

            {error && <FormPaper sx={{marginBottom: 3}}><Alert severity="error">{error}</Alert></FormPaper>}

            {roomState && (
                <FormPaper sx={{marginBottom: 3}}>
                    <Typography variant="h4" sx={{marginBottom: 1}}>Room phase: {roomState.phase}</Typography>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Chip label={`p1: ${roomState.players.p1 ?? 'waiting…'}`}/>
                        <Chip label={`p2: ${roomState.players.p2 ?? 'waiting…'}`}/>
                    </Box>
                </FormPaper>
            )}

            {view && (
                <FormPaper sx={{marginBottom: 3}}>
                    <Typography variant="h4" sx={{marginBottom: 1}}>
                        Battle phase: {view.phase} — Turn {view.turn} — {view.format}
                    </Typography>
                    <Typography variant="body1">
                        {view.me.name}'s team: {view.me.team.map(p => `${p.name} (${p.hpPercent}%)`).join(', ')}
                    </Typography>
                    <Typography variant="body1">
                        {view.foe.name || 'Opponent'}'s team: {view.foe.team.map(p => `${p.name} (${p.hpPercent}%)`).join(', ') || 'not yet revealed'}
                    </Typography>
                    {view.request && (
                        <Typography variant="body2" color="text.secondary" sx={{marginTop: 1}}>
                            Waiting on your choice: {view.request.kind}
                        </Typography>
                    )}
                    {view.winner && (
                        <Typography variant="h5" sx={{marginTop: 2}}>
                            {view.winner === 'tie' ? "It's a tie!" : view.winner === 'me' ? 'You won!' : 'You lost.'}
                        </Typography>
                    )}
                </FormPaper>
            )}

            {log.length > 0 && (
                <FormPaper>
                    <Typography variant="h4" sx={{marginBottom: 1}}>Log</Typography>
                    <Box sx={{maxHeight: 300, overflowY: 'auto', fontFamily: 'monospace', fontSize: 13}}>
                        {log.map((line, i) => <div key={i}>{line}</div>)}
                    </Box>
                </FormPaper>
            )}
        </Box>
    );
};

export default BattleRoom;
