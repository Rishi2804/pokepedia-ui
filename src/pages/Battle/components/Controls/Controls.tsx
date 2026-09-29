import {Box, Button, Typography} from "@mui/material";
import {FC, useEffect, useState} from "react";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {TypeToCardBorder, TypeToCardColor} from "../../../../global/utils.ts";
import {useFormeImageId} from "../../../../services/battle/useFormeImageId.ts";
import type {Choice, RequestView} from "../../../../services/battle/protocol.ts";
import MoveClassIcon from "../../../../components/MoveClassIcon/MoveClassIcon.tsx";
import TypeIcon from "../../../../components/TypeIcon/TypeIcon.tsx";
import {toMoveClass, toPokemonType} from "../typeHelpers.ts";
import {ButtonGrid, MoveButton, SwitchButton, SwitchThumb} from "./styles.ts";

interface SpecialFlags {
    tera?: boolean;
    mega?: boolean;
    zmove?: boolean;
    dynamax?: boolean;
}

interface ControlsProps {
    request: RequestView;
    disabled?: boolean;
    onChoose: (choice: Choice) => void;
}

// Driven entirely by the request's own flags - disabled/trapped/forceSwitch
// and the special-action grants - rather than any battle-state logic of its
// own. What a legal choice is was already decided server-side (see
// view.ts's projectRequest); this just renders that decision and turns a
// click into a semantic Choice.
const Controls: FC<ControlsProps> = ({request, disabled, onChoose}) => {
    const [special, setSpecial] = useState<SpecialFlags>({});
    const formeImageId = useFormeImageId();

    // special is per-request, not persistent: without this, a toggle like
    // Mega Evolve stays stuck on for every later move once the server stops
    // offering it (e.g. already used), silently attaching mega: true to a
    // choice the button for is no longer even visible.
    useEffect(() => setSpecial({}), [request.rqid]);

    if (request.kind === 'wait') {
        return <Typography color="text.secondary">Waiting for opponent…</Typography>;
    }

    const showMoves = request.kind === 'move' && request.moves.length > 0;
    const showSwitches = request.kind === 'switch' || (request.kind === 'move' && !request.trapped);
    const toggleSpecial = (key: keyof SpecialFlags) => setSpecial(prev => ({...prev, [key]: !prev[key]}));

    return (
        <Box>
            {showMoves && (
                <Box sx={{marginBottom: showSwitches ? 2 : 0}}>
                    <Typography variant="h5" sx={{marginBottom: 1}}>Moves</Typography>
                    {(request.special.tera || request.special.mega || request.special.zmove || request.special.dynamax) && (
                        <Box sx={{display: 'flex', gap: 1, marginBottom: 1}}>
                            {request.special.tera && (
                                <Button
                                    size="small"
                                    variant={special.tera ? 'contained' : 'outlined'}
                                    onClick={() => toggleSpecial('tera')}
                                >
                                    Terastallize ({request.special.tera.type})
                                </Button>
                            )}
                            {request.special.mega && (
                                <Button size="small" variant={special.mega ? 'contained' : 'outlined'} onClick={() => toggleSpecial('mega')}>
                                    Mega Evolve
                                </Button>
                            )}
                            {request.special.zmove && (
                                <Button size="small" variant={special.zmove ? 'contained' : 'outlined'} onClick={() => toggleSpecial('zmove')}>
                                    Z-Move
                                </Button>
                            )}
                            {request.special.dynamax && (
                                <Button size="small" variant={special.dynamax ? 'contained' : 'outlined'} onClick={() => toggleSpecial('dynamax')}>
                                    Dynamax
                                </Button>
                            )}
                        </Box>
                    )}
                    <ButtonGrid>
                        {request.moves.map(move => {
                            const pokemonType = toPokemonType(move.type);
                            // Once Z-Move is toggled on, a move without a Z-move name can't
                            // actually be chosen (the Z-Crystal only applies to some moves) -
                            // disable it rather than let the click round-trip to the server
                            // just to come back as an "invalid choice" error.
                            const showZMove = special.zmove && move.zMove;
                            const zIneligible = !!special.zmove && !move.zMove;
                            return (
                                <MoveButton
                                    key={move.index}
                                    typeColor={TypeToCardColor[pokemonType]}
                                    borderColor={TypeToCardBorder[pokemonType]}
                                    disabled={disabled || move.disabled || zIneligible}
                                    onClick={() => onChoose({kind: 'move', index: move.index, ...special})}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 0.75, width: '100%'}}>
                                        <TypeIcon type={pokemonType} variant="circular" size={18}/>
                                        <MoveClassIcon mClass={toMoveClass(move.category)} size={16}/>
                                        <Typography variant="body2" sx={{fontWeight: 700, flex: 1}}>
                                            {showZMove ? move.zMove : move.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{opacity: 0.85}}>
                                        {showZMove ? `from ${move.name}` : `${move.pp}/${move.maxpp} PP`}
                                    </Typography>
                                </MoveButton>
                            );
                        })}
                    </ButtonGrid>
                </Box>
            )}
            {showSwitches && (
                <Box>
                    <Typography variant="h5" sx={{marginBottom: 1}}>{request.forceSwitch ? 'Switch in' : 'Switch'}</Typography>
                    <ButtonGrid>
                        {request.canSwitch.map(mon => (
                            <SwitchButton
                                key={mon.index}
                                disabled={disabled || mon.fainted || mon.active}
                                onClick={() => onChoose({kind: 'switch', index: mon.index})}
                            >
                                <SwitchThumb>
                                    <PokemonImg id={formeImageId(mon.speciesForme, mon.spriteId) ?? 0} shiny={mon.shiny} female={mon.female}/>
                                </SwitchThumb>
                                <Typography variant="body2">
                                    {mon.name}{mon.fainted ? ' (fainted)' : mon.active ? ' (active)' : ''}
                                </Typography>
                            </SwitchButton>
                        ))}
                    </ButtonGrid>
                </Box>
            )}
        </Box>
    );
};

export default Controls;
