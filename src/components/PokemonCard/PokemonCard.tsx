
import {Card} from "./styles.ts";
// import {useNavigate} from "react-router-dom";
import {IPokemonSnapshot} from "../../services/api/types.ts";
import {TypeToCardColor} from "../../global/utils.ts";
import PokemonImg from "../PokemonImg/PokemonImg.tsx";
import {Box, Typography} from "@mui/material";
import {PokemonType} from "../../global/enums.ts";
import TypeIcon from "../TypeIcon/TypeIcon.tsx";

interface IPokedexSelectorProps {
    pokemon: IPokemonSnapshot;
}

const PokedexSelector = ({pokemon}: IPokedexSelectorProps) => {
    //const naviagate = useNavigate()

    // const handleNavigate = () => {
    //     naviagate(`/pokedex/${getFormattedVersion(group as VersionGroup ?? 'national')}`)
    // }

    return (
        <Card color={TypeToCardColor[pokemon.type1 as PokemonType]} borderColor={TypeToCardColor[pokemon.type2 as PokemonType] ?? "#000"}>
            <PokemonImg id={pokemon.pokemonId} />
            <Typography>{pokemon.name}</Typography>
            <Box>
                <TypeIcon type={pokemon.type1 as PokemonType} variant={"empty"}/>
            </Box>
        </Card>
    )
}

export default PokedexSelector