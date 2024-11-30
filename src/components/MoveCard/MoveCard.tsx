import {MoveSnapshot, PokemonMoveSnapshot} from "../../global/types.ts";
import {FC} from "react";
import {Card, SectionContainer} from "./styles.ts";
import {Box, Typography} from "@mui/material";
import TypeIcon from "../TypeIcon/TypeIcon.tsx";
import MoveClassIcon from "../MoveClassIcon/MoveClassIcon.tsx";
import {useNavigate} from "react-router-dom";

interface IMoveCardProps {
    move: PokemonMoveSnapshot | MoveSnapshot
}

function isPokemonMoveSnapshot(move: PokemonMoveSnapshot | MoveSnapshot): move is PokemonMoveSnapshot {
    return (move as PokemonMoveSnapshot).levelLearned !== undefined;
}

const MoveCard: FC<IMoveCardProps> = ({ move }) => {
    const naviagate = useNavigate()

    const handleNavigate = () => {
        naviagate(`/move/${move.id}`)
    }

    return (
        <Card type1={move.type} type2={null} onClick={handleNavigate}>
            <Box sx={{display: 'flex', gap: 4, alignItems: "center"}}>
                {isPokemonMoveSnapshot(move) && !!move.levelLearned && <SectionContainer>
                    <Typography variant="h5" color="white">Level</Typography>
                    <Typography variant="h5" color="white">{move.levelLearned}</Typography>
                </SectionContainer>}
                <Typography variant="h5" color="white">{move.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: 6}}>
                <SectionContainer>
                    <Typography variant="h5" color="white">Power</Typography>
                    <Typography variant="h5" color="white">{move.power ?? "--"}</Typography>
                </SectionContainer>
                <SectionContainer>
                    <Typography variant="h5" color="white">Accuracy</Typography>
                    <Typography variant="h5" color="white">{move.accuracy ?? "--"}</Typography>
                </SectionContainer>
                <SectionContainer>
                    <Typography variant="h5" color="white">PP</Typography>
                    <Typography variant="h5" color="white">{move.pp ?? "--"}</Typography>
                </SectionContainer>
                <SectionContainer sx={{gap: 1}}>
                    <TypeIcon type={move.type} variant="circular" size={25} />
                    <MoveClassIcon mClass={move.moveClass} size={25} />
                </SectionContainer>
            </Box>
        </Card>
    );
};

export default MoveCard;