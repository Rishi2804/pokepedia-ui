
import {Card, NameText, TypeIconContainer} from "./styles.ts";
import {useNavigate} from "react-router-dom";
import PokemonImg from "../PokemonImg/PokemonImg.tsx";
import {Box, Typography} from "@mui/material";
import {PokemonType} from "../../global/enums.ts";
import TypeIcon from "../TypeIcon/TypeIcon.tsx";
import {PokemonSnapshot} from "../../global/types.ts";
import {FC} from "react";

interface IPokemonCardProps {
    data: PokemonSnapshot;
}

const PokemonCard: FC<IPokemonCardProps> = ({data}) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokemon/${data.pokemonId}`)
    }

    return (
        <Card type1={data.type1 as PokemonType} type2={data.type2 as PokemonType} onClick={handleNavigate}>
            <Typography sx={{paddingLeft: 1, color: "#fff"}}>{data.dexNumber}</Typography>
            <PokemonImg id={data.pokemonId} />
            <Box sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
                <NameText variant="h5">{data.name}</NameText>
                <TypeIconContainer>
                    <TypeIcon type={data.type1 as PokemonType} variant={"circular"} size={30}/>
                    {data.type2 ? <TypeIcon type={data.type2 as PokemonType} variant={"circular"} size={30}/> : <></>}
                </TypeIconContainer>
            </Box>
        </Card>
    )
}

export default PokemonCard