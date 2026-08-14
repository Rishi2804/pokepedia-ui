import {FC} from "react";
import {Box} from "@mui/material";
import {PokemonType} from "../../../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../../../global/utils.ts";

interface StatMeterProps {
    type1: PokemonType;
    type2: PokemonType | null;
    base: number;
    final: number | null;
    referenceMax: number;
}

// A single fill on an absolute scale (a fraction of referenceMax, the best any
// real Pokemon's stat could be — see stats.ts), so the bar responds live as
// EVs/IVs/nature change but stays comparable across the whole team. When the
// ruleset has no verified final-stat formula (Legends Arceus effort levels),
// `final` comes in null and the meter falls back to the base stat.
const StatMeter: FC<StatMeterProps> = ({type1, type2, base, final, referenceMax}) => {
    const color = TypeToCardColor[type1];
    const borderColor = type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1];

    const fillValue = final ?? base;
    const fillPct = Math.min(100, (fillValue / referenceMax) * 100);

    return (
        <Box
            sx={{
                position: 'relative',
                flex: '1 1 120px',
                minWidth: 80,
                height: 20,
                borderRadius: '4px',
                border: `3px solid ${borderColor}`,
                overflow: 'hidden',
            }}
        >
            <Box sx={{position: 'absolute', inset: 0, width: `${fillPct}%`, backgroundColor: color}}/>
        </Box>
    );
};

export default StatMeter;
