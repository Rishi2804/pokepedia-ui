import {Alert, Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {versionGroupLabel} from "../../global/labels.ts";
import {BATTLE_WS_URL, ROOM_CODE_LENGTH} from "../../services/battle/constants.ts";
import {describeBattle} from "../../services/battle/describeBattle.ts";
import type {ClientMessage, ServerMessage} from "../../services/battle/protocol.ts";
import {toBattleTeam} from "../../services/battle/toBattleTeam.ts";
import {teamCandidatesQuery} from "../../services/api/hooks/useTeamCandidatesData.ts";
import {useBattleRoom} from "../../services/battle/useBattleRoom.ts";
import {useBattleSocket} from "../../services/battle/useBattleSocket.ts";
import {saveBattleSession, loadBattleSession, clearBattleSession} from "../../services/battle/session.ts";
import TeamPicker, {TeamPickerSelection} from "./components/TeamPicker/TeamPicker.tsx";
import {FormPaper, ModeToggleRow} from "./styles.ts";

const PLAYER_NAME_KEY = 'pokepedia-battle-player-name';

type Mode = 'create' | 'join';

interface FlowError {
    message: string;
    problems?: string[];
}

const BattleHome: FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [mode, setMode] = useState<Mode>('create');
    const [name, setName] = useState(() => localStorage.getItem(PLAYER_NAME_KEY) ?? '');
    const [joinCode, setJoinCode] = useState('');
    const [selection, setSelection] = useState<TeamPickerSelection | null>(null);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState<FlowError | null>(null);
    const [wsUrl, setWsUrl] = useState<string | null>(null);
    const [resumeCode, setResumeCode] = useState<string | null>(null);

    const pendingMessageRef = useRef<ClientMessage | null>(null);

    useEffect(() => {
        setResumeCode(loadBattleSession()?.code ?? null);
    }, []);

    const handleMessage = useCallback((message: ServerMessage) => {
        if (message.t === 'created' || message.t === 'joined') {
            saveBattleSession({code: message.code, seatToken: message.seatToken});
            navigate(`/battle/${message.code}`);
            return;
        }
        if (message.t === 'error') {
            setError({message: message.message, problems: message.problems});
            setConnecting(false);
            setWsUrl(null);
        }
    }, [navigate]);

    const {status, send} = useBattleSocket(wsUrl, handleMessage);

    useEffect(() => {
        if (status === 'open' && pendingMessageRef.current) {
            send(pendingMessageRef.current);
            pendingMessageRef.current = null;
        }
        if (status === 'closed' && connecting) {
            setConnecting(false);
            setError(prev => prev ?? {message: 'Lost connection to the battle server.'});
        }
    }, [status, connecting, send]);

    // Joining: the room decides the format, so look it up as soon as the code
    // is complete and hold the team to the room's version group.
    const roomCode = joinCode.trim().toUpperCase();
    const roomLookup = useBattleRoom(mode === 'join' ? roomCode : '');
    const room = roomLookup.data;
    const lockedTo = mode === 'join' && room?.joinable ? {versionGroup: room.versionGroup} : undefined;
    const lockedVersionGroup = lockedTo?.versionGroup;
    const isLocked = !!lockedTo;

    // A team picked before the room was known (or for a previous code) may not
    // fit - drop it rather than letting a doomed join through.
    useEffect(() => {
        if (isLocked && selection && selection.versionGroup !== lockedVersionGroup) setSelection(null);
    }, [isLocked, lockedVersionGroup, selection]);

    const canSubmit = !!selection && selection.pokemon.length > 0 && name.trim().length > 0 &&
        (mode === 'create' || (!!room?.joinable && selection.versionGroup === room.versionGroup));

    const handleSubmit = async () => {
        if (!selection) return;
        const trimmedName = name.trim();
        localStorage.setItem(PLAYER_NAME_KEY, trimmedName);

        const {versionGroup} = selection;
        // The national list carries every Pokemon's Showdown id; usually a cache hit.
        let team;
        try {
            const groups = await queryClient.fetchQuery(teamCandidatesQuery('national'));
            team = toBattleTeam(selection.pokemon, groups.flatMap(group => group.pokemon));
        } catch {
            setError({message: "Couldn't load Pokémon data to build your team. Check the connection and try again."});
            return;
        }

        pendingMessageRef.current = mode === 'create'
            ? {t: 'create', versionGroup, name: trimmedName, team}
            : {t: 'join', code: roomCode, versionGroup, name: trimmedName, team};

        setError(null);
        setConnecting(true);
        setWsUrl(BATTLE_WS_URL);
    };

    const handleDismissResume = () => {
        clearBattleSession();
        setResumeCode(null);
    };

    return (
        <Box sx={{paddingY: 3}}>
            <MetaData pageTitle="Battle | PokePedia"/>
            <Typography variant="h1" sx={{textAlign: "center", marginBottom: 3}}>Battle</Typography>

            {resumeCode && (
                <FormPaper sx={{marginBottom: 3}}>
                    <Alert
                        severity="info"
                        action={
                            <Box sx={{display: 'flex', gap: 1}}>
                                <Button size="small" onClick={handleDismissResume}>Dismiss</Button>
                                <Button size="small" variant="contained" onClick={() => navigate(`/battle/${resumeCode}`)}>
                                    Resume
                                </Button>
                            </Box>
                        }
                    >
                        You have a battle in progress (room {resumeCode}).
                    </Alert>
                </FormPaper>
            )}

            <FormPaper>
                <ModeToggleRow>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={(_, next) => next && setMode(next)}
                    >
                        <ToggleButton value="create">Create Battle</ToggleButton>
                        <ToggleButton value="join">Join by Code</ToggleButton>
                    </ToggleButtonGroup>
                </ModeToggleRow>

                <TextField
                    fullWidth
                    label="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    sx={{marginBottom: 2}}
                />

                {mode === 'join' && (
                    <TextField
                        fullWidth
                        label="Room code"
                        value={joinCode}
                        onChange={e => setJoinCode(e.target.value.toUpperCase())}
                        sx={{marginBottom: 2}}
                        slotProps={{htmlInput: {style: {fontFamily: 'monospace', letterSpacing: 2}, maxLength: ROOM_CODE_LENGTH}}}
                    />
                )}

                {mode === 'join' && roomCode.length === ROOM_CODE_LENGTH && (
                    <Box sx={{marginBottom: 2}}>
                        {roomLookup.isPending && (
                            <Typography variant="body2" color="text.secondary">Looking up room…</Typography>
                        )}
                        {roomLookup.isError && (
                            <Alert severity="error">Couldn't reach the battle server to look up that room.</Alert>
                        )}
                        {roomLookup.isSuccess && !room && (
                            <Alert severity="warning">No battle room with that code.</Alert>
                        )}
                        {room && !room.joinable && (
                            <Alert severity="warning">That battle room already has two players.</Alert>
                        )}
                        {room?.joinable && (
                            <Alert severity="info">
                                {room.host ? `${room.host}'s` : 'This'} room is a {room.formatName} battle
                                ({room.versionGroup ? versionGroupLabel[room.versionGroup] : 'Home'}) — pick a team built for
                                the same game.
                            </Alert>
                        )}
                    </Box>
                )}

                <Typography variant="h4" sx={{marginBottom: 1}}>Choose your team</Typography>
                <TeamPicker lockedTo={lockedTo} onSelect={next => {
                    setSelection(next);
                    setError(null);
                }}/>

                {mode === 'create' && selection && (
                    <Typography variant="body2" color="text.secondary" sx={{marginTop: 2}}>
                        {describeBattle(selection.versionGroup)}
                    </Typography>
                )}

                {error && (
                    <Alert severity="error" sx={{marginTop: 2, whiteSpace: 'pre-line'}}>
                        {error.message}
                        {error.problems && error.problems.length > 0 && `\n${error.problems.join('\n')}`}
                    </Alert>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{marginTop: 3}}
                    disabled={!canSubmit || connecting}
                    onClick={handleSubmit}
                >
                    {connecting ? 'Connecting…' : mode === 'create' ? 'Create Battle' : 'Join Battle'}
                </Button>
            </FormPaper>
        </Box>
    );
};

export default BattleHome;
