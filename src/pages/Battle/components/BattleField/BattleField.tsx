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
    gen: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

// Foe upper-right, mine lower-left. Real Showdown front/back sprites make
// the two sides face each other with no mirroring needed.
const BattleField: FC<BattleFieldProps> = ({field, me, foe, turn, gen}) => {
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
                                speciesForme={foe.active.speciesForme}
                                side="p2"
                                shiny={foe.active.shiny}
                                gender={foe.active.gender}
                                fainted={foe.active.fainted}
                                gen={gen}
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
                                speciesForme={me.active.speciesForme}
                                side="p1"
                                shiny={me.active.shiny}
                                gender={me.active.gender}
                                fainted={me.active.fainted}
                                gen={gen}
                                size={130}
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
