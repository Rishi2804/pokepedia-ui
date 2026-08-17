import {Alert, Box, Button, Chip, LinearProgress, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {FC} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MetaData from "../../components/MetaData/MetaData.tsx";
import type {LogSpeed} from "../../services/battle/useBattleView.ts";
import {useBattleView} from "../../services/battle/useBattleView.ts";
import BattleLog from "./components/BattleLog/BattleLog.tsx";
import Controls from "./components/Controls/Controls.tsx";
import TeamPreview from "./components/TeamPreview/TeamPreview.tsx";
import {FormPaper} from "./styles.ts";

/**
 * Route /battle/:code. All connection/resume/reveal state lives in
 * useBattleView - this switches on view.phase and hands the current
 * request off to whichever control surface owns it (TeamPreview for
 * team preview, Controls for move/switch). Still unstyled - the themed
 * battle scene driven by the same BattleView is Phase 5.
 */
const BattleRoom: FC = () => {
    const {code} = useParams<{ code: string }>();
    const navigate = useNavigate();
    const {
        status, sessionValid, roomState, view, log, isRevealing, error, dismissError,
        canChoose, sendChoice, speed, setSpeed, skipReveal, leave,
    } = useBattleView(code);

    const handleLeave = () => {
        leave();
        navigate('/battle');
    };

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

            {error && (
                <FormPaper sx={{marginBottom: 3}}>
                    <Alert severity="error" onClose={dismissError}>{error.code}: {error.message}</Alert>
                </FormPaper>
            )}

            {roomState && !view && (
                <FormPaper sx={{marginBottom: 3}}>
                    <Typography variant="h4" sx={{marginBottom: 1}}>Room phase: {roomState.phase}</Typography>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Chip label={`p1: ${roomState.players.p1 ?? 'waiting…'}`}/>
                        <Chip label={`p2: ${roomState.players.p2 ?? 'waiting…'}`}/>
                    </Box>
                </FormPaper>
            )}

            {view && (
                <>
                    <FormPaper sx={{marginBottom: 3}}>
                        <Typography variant="h4" sx={{marginBottom: 1}}>
                            {view.phase === 'teampreview' ? 'Team Preview' : `Turn ${view.turn}`} — {view.format}
                        </Typography>
                        <Typography variant="body1">
                            {view.me.name}'s team: {view.me.team.map(p => `${p.name} (${p.hpPercent}%)`).join(', ')}
                        </Typography>
                        <Typography variant="body1">
                            {view.foe.name || 'Opponent'}'s team: {view.foe.team.map(p => `${p.name} (${p.hpPercent}%)`).join(', ') || 'not yet revealed'}
                        </Typography>
                        {view.winner && (
                            <Typography variant="h5" sx={{marginTop: 2}}>
                                {view.winner === 'tie' ? "It's a tie!" : view.winner === 'me' ? 'You won!' : 'You lost.'}
                            </Typography>
                        )}
                    </FormPaper>

                    {view.phase === 'teampreview' && view.request?.kind === 'teampreview' && (
                        <FormPaper sx={{marginBottom: 3}}>
                            <TeamPreview team={view.me.team} teamPreviewSize={view.request.teamPreviewSize} onChoose={sendChoice}/>
                        </FormPaper>
                    )}

                    {view.phase === 'battle' && view.request && (
                        <FormPaper sx={{marginBottom: 3}}>
                            <Controls request={view.request} disabled={!canChoose} onChoose={sendChoice}/>
                        </FormPaper>
                    )}

                    {view.phase === 'ended' && (
                        <FormPaper sx={{marginBottom: 3}}>
                            <Button variant="contained" onClick={handleLeave}>Leave</Button>
                        </FormPaper>
                    )}
                </>
            )}

            {log.length > 0 && (
                <FormPaper>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 1}}>
                        <ToggleButtonGroup
                            size="small"
                            value={speed}
                            exclusive
                            onChange={(_, next) => next && setSpeed(next as LogSpeed)}
                        >
                            <ToggleButton value="instant">Instant</ToggleButton>
                            <ToggleButton value="fast">Fast</ToggleButton>
                            <ToggleButton value="normal">Normal</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <BattleLog entries={log} isRevealing={isRevealing} onSkip={skipReveal}/>
                </FormPaper>
            )}
        </Box>
    );
};

export default BattleRoom;
