import {Box} from "@mui/material";
import {FC} from "react";
import type {FieldView, SideView} from "../../../../services/battle/protocol.ts";
import PokemonSprite from "../PokemonSprite/PokemonSprite.tsx";
import StatBar from "../StatBar/StatBar.tsx";
import FieldStrip from "./FieldStrip.tsx";
import {Scene, SlotArea} from "./styles.ts";
import {TERRAIN_COLOR, WEATHER_GRADIENT} from "./weatherTheme.ts";

interface BattleFieldProps {
    field: FieldView;
    me: SideView;
    foe: SideView;
    turn: number;
}

// The whole themed scene: a weather/terrain-keyed backdrop with the two
// active Pokemon placed in opposite corners (foe upper-right, mine
// lower-left, per the battle plan's Phase 5 layout). Both sprites are the
// same front-facing HOME render - PokemonSprite's `flip` mirrors mine so
// the two face each other despite neither having a real back sprite.
const BattleField: FC<BattleFieldProps> = ({field, me, foe, turn}) => {
    const gradient = field.weather ? WEATHER_GRADIENT[field.weather.id] ?? null : null;
    const terrainColor = field.terrain ? TERRAIN_COLOR[field.terrain.id] ?? null : null;

    return (
        <Box>
            <FieldStrip turn={turn} field={field}/>
            <Scene gradient={gradient} terrainColor={terrainColor}>
                <SlotArea corner="top-right">
                    {foe.active && (
                        <>
                            <StatBar slot={foe.active} boosts={foe.active.boosts} volatiles={foe.active.volatiles} align="right"/>
                            <PokemonSprite
                                key={foe.active.ident}
                                spriteId={foe.active.spriteId}
                                shiny={foe.active.shiny}
                                female={foe.active.female}
                                fainted={foe.active.fainted}
                                size={110}
                            />
                        </>
                    )}
                </SlotArea>
                <SlotArea corner="bottom-left">
                    {me.active && (
                        <>
                            <PokemonSprite
                                key={me.active.ident}
                                spriteId={me.active.spriteId}
                                shiny={me.active.shiny}
                                female={me.active.female}
                                fainted={me.active.fainted}
                                size={130}
                                flip
                            />
                            <StatBar slot={me.active} boosts={me.active.boosts} volatiles={me.active.volatiles} align="left"/>
                        </>
                    )}
                </SlotArea>
            </Scene>
        </Box>
    );
};

export default BattleField;
