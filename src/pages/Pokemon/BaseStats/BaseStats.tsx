import {FC} from "react";
import {Divider, Grid2 as Grid, Stack, Typography} from "@mui/material";
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
        <Grid size={{xs: 12, sm: 7}} id={"Base Stats"}>
            <Stack divider={<Divider flexItem />}>
                <Typography variant="h2" sx={{marginBottom: 2}}>Base Stats</Typography>
                <StatSection stat={hp} name={"HP"} type1={type1} type2={type2} />
                <StatSection stat={atk} name={"Attack"} type1={type1} type2={type2} />
                <StatSection stat={def} name={"Defense"} type1={type1} type2={type2} />
                <StatSection stat={spatk} name={"Sp. Atk"} type1={type1} type2={type2} />
                <StatSection stat={spdef} name={"Sp. Def"} type1={type1} type2={type2} />
                <StatSection stat={speed} name={"Speed"} type1={type1} type2={type2} />
                <InfoSection bst={bst}/>
            </Stack>
            <Divider flexItem />
            <Stack>
                <Typography variant="caption">The ranges shown on the right are for a level 50 Pokémon.</Typography>
                <Typography variant="caption">Max values are based on a good nature, 252 EVs, 31 IVs.</Typography>
                <Typography variant="caption">Min values are based on a bad nature, 0 EVs, 0 IVs.</Typography>
            </Stack>
        </Grid>
    )
}

export default BaseStats