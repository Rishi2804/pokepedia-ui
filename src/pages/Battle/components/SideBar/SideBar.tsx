import {Box} from "@mui/material";
import {FC} from "react";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import type {SideConditionView, SlotView} from "../../../../services/battle/protocol.ts";
import {Pill} from "../sharedStyles.ts";
import {STATUS_COLOR} from "../statusTheme.ts";
import {BlankPip, Pip} from "./styles.ts";

interface SideBarProps {
    team: SlotView[];
    teamSize: number;
    conditions: SideConditionView[];
    align?: 'left' | 'right';
}

// `team` only ever contains what this seat's Battle has revealed (see
// view.ts's projectSide) - the gap up to teamSize is rendered as blank
// pips rather than guessed at, since there's nothing server-side to guess
// from either.
const SideBar: FC<SideBarProps> = ({team, teamSize, conditions, align = 'left'}) => {
    const unrevealed = Math.max(0, teamSize - team.length);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: align === 'right' ? 'flex-end' : 'flex-start'}}>
            <Box sx={{display: 'flex', gap: 0.75, flexDirection: align === 'right' ? 'row-reverse' : 'row'}}>
                {team.map((mon, i) => (
                    <Pip key={`${mon.ident}-${i}`} ringColor={mon.status ? STATUS_COLOR[mon.status] : null} fainted={mon.fainted} title={mon.name}>
                        {mon.spriteId !== null && <PokemonImg id={mon.spriteId} shiny={mon.shiny} female={mon.female}/>}
                    </Pip>
                ))}
                {Array.from({length: unrevealed}, (_, i) => <BlankPip key={`blank-${i}`}/>)}
            </Box>
            {conditions.length > 0 && (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: align === 'right' ? 'flex-end' : 'flex-start'}}>
                    {conditions.map(c => (
                        <Pill key={c.id} bg="#5c6370">{c.name}{c.level > 1 ? ` x${c.level}` : ''}</Pill>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default SideBar;
