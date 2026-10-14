import {Alert, Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {BATTLE_WS_URL} from "../../services/battle/constants.ts";
import {describeBattle} from "../../services/battle/describeBattle.ts";
import type {ClientMessage, ServerMessage} from "../../services/battle/protocol.ts";
import {toBattleTeam} from "../../services/battle/toBattleTeam.ts";
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

    const canSubmit = !!selection && selection.pokemon.length > 0 && name.trim().length > 0 &&
        (mode === 'create' || joinCode.trim().length > 0);

    const handleSubmit = () => {
        if (!selection) return;
        const trimmedName = name.trim();
        localStorage.setItem(PLAYER_NAME_KEY, trimmedName);

        const {versionGroup} = selection;
        const team = toBattleTeam(selection.pokemon);

        pendingMessageRef.current = mode === 'create'
            ? {t: 'create', versionGroup, name: trimmedName, team}
            : {t: 'join', code: joinCode.trim().toUpperCase(), versionGroup, name: trimmedName, team};

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
                        slotProps={{htmlInput: {style: {fontFamily: 'monospace', letterSpacing: 2}}}}
                    />
                )}

                <Typography variant="h4" sx={{marginBottom: 1}}>Choose your team</Typography>
                <TeamPicker onSelect={next => {
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
