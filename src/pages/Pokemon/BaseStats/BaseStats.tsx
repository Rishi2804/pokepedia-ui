import {FC} from "react";
import {Grid2 as Grid, Typography} from "@mui/material";
import {PokemonType} from "../../../global/enums.ts";
import StatSection from "./components/StatSection.tsx";
import InfoSection from "./components/InfoSection.tsx";

interface IBaseStatsProps {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
    bst: number;
    type1: PokemonType;
    type2: PokemonType | null;
}

const BaseStats: FC<IBaseStatsProps> = ({hp, atk, def, spatk, spdef, speed, bst, type1, type2}) => {
    return (
        <Grid size={{xs: 12, sm: 7}}>
            <Typography variant="h2" sx={{marginBottom: 2}}>Base Stats</Typography>
            <StatSection stat={hp} name={"HP"} type1={type1} type2={type2} />
            <StatSection stat={atk} name={"Attack"} type1={type1} type2={type2} />
            <StatSection stat={def} name={"Defence"} type1={type1} type2={type2} />
            <StatSection stat={spatk} name={"Sp. Atk"} type1={type1} type2={type2} />
            <StatSection stat={spdef} name={"Sp. Def"} type1={type1} type2={type2} />
            <StatSection stat={speed} name={"Speed"} type1={type1} type2={type2} />
            <InfoSection bst={bst}/>
        </Grid>
    )
}

export default BaseStats