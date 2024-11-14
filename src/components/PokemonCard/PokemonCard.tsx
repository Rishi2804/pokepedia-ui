
import {Card, TypeIconContainer} from "./styles.ts";
// import {useNavigate} from "react-router-dom";
import {IPokemonSnapshot} from "../../services/api/types.ts";
import PokemonImg from "../PokemonImg/PokemonImg.tsx";
import {Box, Typography} from "@mui/material";
import {PokemonType} from "../../global/enums.ts";
import TypeIcon from "../TypeIcon/TypeIcon.tsx";

interface IPokemonCardProps {
    data: IPokemonSnapshot;
}

const PokemonCard = ({data}: IPokemonCardProps) => {
    //const naviagate = useNavigate()

    // const handleNavigate = () => {
    //     naviagate(`/pokemon/${pokemon.pokemonId}`)
    // }

    return (
        <Card type1={data.type1 as PokemonType} type2={data.type2 as PokemonType}>
            <Typography sx={{paddingLeft: 1, color: "#fff"}}>{data.dexNumber}</Typography>
            <PokemonImg id={data.pokemonId} />
            <Box sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Typography variant={"h5"} sx={{color: "#fff"}}>{data.name}</Typography>
                <TypeIconContainer>
                    <TypeIcon type={data.type1 as PokemonType} variant={"circular"} size={30}/>
                    {data.type2 ? <TypeIcon type={data.type2 as PokemonType} variant={"circular"} size={30}/> : <></>}
                </TypeIconContainer>
            </Box>
        </Card>
    )
}

export default PokemonCard