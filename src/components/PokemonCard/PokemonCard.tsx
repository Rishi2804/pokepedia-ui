
import {Card} from "./styles.ts";
// import {useNavigate} from "react-router-dom";
import {IPokemonSnapshot} from "../../services/api/types.ts";
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
    //     naviagate(`/pokemon/${pokemon.pokemonId}`)
    // }

    return (
        <Card type1={pokemon.type1 as PokemonType} type2={pokemon.type2 as PokemonType}>
            <PokemonImg id={pokemon.pokemonId} />
            <Typography>{pokemon.name}</Typography>
            <Box>
                <TypeIcon type={pokemon.type1 as PokemonType} variant={"empty"}/>
            </Box>
        </Card>
    )
}

export default PokedexSelector