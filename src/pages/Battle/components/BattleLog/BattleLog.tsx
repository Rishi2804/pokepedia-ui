import {Box, Button, Typography} from "@mui/material";
import {FC, useEffect, useRef} from "react";
import type {LogKind} from "../../../../services/battle/protocol.ts";
import type {RevealedLogLine} from "../../../../services/battle/useBattleView.ts";
import {LogBox} from "./styles.ts";

const KIND_COLOR: Partial<Record<LogKind, string>> = {
    damage: 'error.main',
    heal: 'success.main',
    faint: 'error.dark',
    status: 'warning.main',
    win: 'success.main',
    turn: 'text.secondary',
};

interface BattleLogProps {
    entries: RevealedLogLine[];
    isRevealing: boolean;
    onSkip: () => void;
}

// Renders whatever useBattleView has already paced onto `entries` - the
// reveal timing itself lives in the hook, not here. `kind` (see the server's
// classifyLine) picks the text colour; kinds with no entry here just render
// in the default body colour.
const BattleLog: FC<BattleLogProps> = ({entries, isRevealing, onSkip}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({block: 'nearest'});
    }, [entries.length]);

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1}}>
                <Typography variant="h4">Battle Log</Typography>
                {isRevealing && <Button size="small" onClick={onSkip}>Skip</Button>}
            </Box>
            <LogBox>
                {entries.map(entry => (
                    <Typography key={entry.id} variant="body2" sx={{color: KIND_COLOR[entry.kind] ?? 'text.primary'}}>
                        {entry.text}
                    </Typography>
                ))}
                <div ref={bottomRef}/>
            </LogBox>
        </Box>
    );
};

export default BattleLog;
