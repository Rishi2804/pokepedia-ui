import {PokemonType} from "../../../global/enums.ts";
import {FC} from "react";
import {Divider, Grid2 as Grid, Stack, Typography} from "@mui/material";
import GenderRatio from "./components/GenderRatio.tsx";
import PTypes from "./components/PTypes.tsx";
import NationalDexNumber from "./components/NationalDexNumber.tsx";
import Measurements from "./components/Measurements.tsx";
import Abilities from "./components/Abilities.tsx";

interface IPokedexDataProps {
    id: number;
    type1: PokemonType;
    type2: PokemonType | null;
    genderRatio: number;
    height: number;
    weight: number;
    abilities: {
        abilityId: number;
        abilityName: string;
        isHidden: boolean;
        genRemoved: number | null;
    }[];
}

const PokedexData: FC<IPokedexDataProps> = ({id, type1, type2, genderRatio, height, weight, abilities}) => {

    return (
        <Grid size={{xs: 12, sm: 8}}>
            <Stack divider={<Divider orientation={"horizontal"} flexItem/>  }>
                <Typography variant="h2" sx={{marginBottom: 2}}>Data</Typography>
                <NationalDexNumber id={id} />
                <PTypes type1={type1} type2={type2} />
                <GenderRatio genderRatio={genderRatio} />
                <Measurements height={height} weight={weight} />
                <Abilities abilities={abilities} />
            </Stack>
            <Divider flexItem />
        </Grid>
    )
}

export default PokedexData;