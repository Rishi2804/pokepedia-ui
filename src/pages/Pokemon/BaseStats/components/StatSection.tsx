import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {StatBar, StatRow} from "./styles.tsx";
import {PokemonType} from "../../../../global/enums.ts";

interface IDexNumberProps {
    stat: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
}

const StatSection: FC<IDexNumberProps> = ({stat, name, type1, type2}) => {
    const calculateHpStat = (base: number, iv: number, ev: number, level: number) => {
        return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10
    }

    const calculateStat = (base: number, iv: number, ev: number, level: number, nature: number) => {
        return Math.floor((Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * nature)
    }

    const minStat = name === "HP" ?
        calculateHpStat(stat, 0, 0, 50) :
        calculateStat(stat, 0, 0, 50, 0.9)
    const maxStat = name === "HP" ?
        calculateHpStat(stat, 31, 252, 50) :
        calculateStat(stat, 31, 252, 50, 1.1)

    return (
        <StatRow>
            <Typography minWidth={80}>{name}</Typography>
            <Typography minWidth={20}>{stat}</Typography>
            <Box sx={{display: "flex", width: "100%"}}>
                <StatBar type1={type1} type2={type2} stat={stat}/>
            </Box>
            <Typography>{minStat}</Typography>
            <Typography minWidth={30} textAlign="end">{maxStat}</Typography>
        </StatRow>
    )
}

export default StatSection