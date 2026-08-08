import {FC} from "react";
import {Box} from "@mui/material";
import {PokemonType} from "../../../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../../../global/utils.ts";

interface StatMeterProps {
    type1: PokemonType;
    type2: PokemonType | null;
    base: number;
    final: number | null;
    maxAchievable: number | null;
    referenceMax: number;
}

// Two segments on one absolute scale (both as a fraction of referenceMax, the
// best any real Pokemon's stat could be — see stats.ts): a solid fill for the
// stat this set actually has right now, and a faint band showing how much
// further it could still go with maxed EVs/IVs and a boosting nature. When the
// ruleset has no verified final-stat formula (Legends Arceus effort levels),
// `final`/`maxAchievable` come in null and the meter falls back to a single
// segment for the base stat, rather than showing nothing.
const StatMeter: FC<StatMeterProps> = ({type1, type2, base, final, maxAchievable, referenceMax}) => {
    const color = TypeToCardColor[type1];
    const borderColor = type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1];

    const fillValue = final ?? base;
    const headroomValue = maxAchievable ?? fillValue;

    const fillPct = Math.min(100, (fillValue / referenceMax) * 100);
    const headroomPct = Math.min(100, (headroomValue / referenceMax) * 100);

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
            <Box sx={{position: 'absolute', inset: 0, width: `${headroomPct}%`, backgroundColor: color, opacity: 0.35}}/>
            <Box sx={{position: 'absolute', inset: 0, width: `${fillPct}%`, backgroundColor: color}}/>
        </Box>
    );
};

export default StatMeter;
