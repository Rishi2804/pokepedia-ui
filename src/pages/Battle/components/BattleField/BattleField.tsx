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

// Foe upper-right, mine lower-left. Real Showdown front/back sprites make
// the two sides face each other with no mirroring needed.
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
                                sprite={foe.active.sprite}
                                name={foe.active.speciesForme}
                                side="p2"
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
                                sprite={me.active.sprite}
                                name={me.active.speciesForme}
                                side="p1"
                                fainted={me.active.fainted}
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
