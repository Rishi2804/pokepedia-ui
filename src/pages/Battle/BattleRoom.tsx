import {Alert, Box, Button, Chip, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {FC} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {formatLabel} from "../../services/battle/formatLabel.ts";
import type {LogSpeed} from "../../services/battle/useBattleView.ts";
import {useBattleView} from "../../services/battle/useBattleView.ts";
import BattleField from "./components/BattleField/BattleField.tsx";
import BattleLog from "./components/BattleLog/BattleLog.tsx";
import Controls from "./components/Controls/Controls.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import TeamPreview from "./components/TeamPreview/TeamPreview.tsx";
import BattleRoomSkeleton from "./BattleRoomSkeleton.tsx";
import {BattleLayout, FormPaper, WideFormPaper} from "./styles.ts";

/**
 * Route /battle/:code. All connection/resume/reveal state lives in
 * useBattleView - this switches on view.phase and hands the current
 * request off to whichever control surface owns it (TeamPreview for
 * team preview, Controls for move/switch).
 */
const BattleRoom: FC = () => {
    const {code} = useParams<{ code: string }>();
    const navigate = useNavigate();
    const {
        status, sessionValid, roomState, view, log, isRevealing, error, dismissError,
        canChoose, sendChoice, speed, setSpeed, skipReveal, leave, rematch,
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

    // Nothing to render yet - covers both the WebSocket still connecting and
    // the brief gap after it opens before the server's first roomState/view
    // arrives. An error this early (e.g. an expired seat token) still needs
    // to reach the user, so it skips the skeleton rather than hiding behind it.
    if (!roomState && !view && !error) {
        return (
            <>
                <MetaData pageTitle={`Battle ${code} | PokePedia`}/>
                <BattleRoomSkeleton/>
            </>
        );
    }

    return (
        <Box sx={{paddingY: 3}}>
            <MetaData pageTitle={`Battle ${code} | PokePedia`}/>
            <Typography variant="h1" sx={{textAlign: "center", marginBottom: 1}}>Room {code}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", marginBottom: 3}}>
                Connection: {status}
            </Typography>

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
                    <FormPaper sx={{marginBottom: 3, textAlign: 'center'}}>
                        <Typography variant="h4">
                            {view.phase === 'teampreview' ? 'Team Preview' : formatLabel(view.format)}
                        </Typography>
                        {view.winner && (
                            <Typography variant="h5" sx={{marginTop: 1}}>
                                {view.winner === 'tie' ? "It's a tie!" : view.winner === 'me' ? 'You won!' : 'You lost.'}
                            </Typography>
                        )}
                    </FormPaper>

                    {view.phase === 'teampreview' && view.request?.kind === 'teampreview' && (
                        <FormPaper sx={{marginBottom: 3}}>
                            <TeamPreview team={view.me.team} teamPreviewSize={view.request.teamPreviewSize} onChoose={sendChoice}/>
                        </FormPaper>
                    )}

                    {view.phase !== 'teampreview' && (
                        <BattleLayout>
                            <WideFormPaper>
                                <Typography variant="body2" color="text.secondary" sx={{marginBottom: 0.5}}>
                                    {view.foe.name || 'Opponent'}
                                </Typography>
                                <SideBar team={view.foe.team} teamSize={view.foe.teamSize} conditions={view.foe.conditions}/>

                                <Box sx={{marginY: 1.5}}>
                                    <BattleField field={view.field} me={view.me} foe={view.foe} turn={view.turn}/>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{marginBottom: 0.5}}>
                                    {view.me.name}
                                </Typography>
                                <SideBar team={view.me.team} teamSize={view.me.teamSize} conditions={view.me.conditions}/>
                            </WideFormPaper>

                            <WideFormPaper>
                                {view.phase === 'battle' && view.request && (
                                    <Controls request={view.request} disabled={!canChoose} onChoose={sendChoice}/>
                                )}
                                {view.phase === 'ended' && (
                                    <Box sx={{display: 'flex', gap: 2, justifyContent: 'center'}}>
                                        <Button variant="contained" onClick={rematch}>Rematch</Button>
                                        <Button variant="outlined" onClick={handleLeave}>Leave</Button>
                                    </Box>
                                )}
                            </WideFormPaper>

                            {log.length > 0 && (
                                <WideFormPaper>
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
                                </WideFormPaper>
                            )}
                        </BattleLayout>
                    )}
                </>
            )}
        </Box>
    );
};

export default BattleRoom;
