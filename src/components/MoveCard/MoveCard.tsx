import {MoveSnapshot, PokemonMoveSnapshot} from "../../global/types.ts";
import {FC} from "react";
import {Card, SectionContainer} from "./styles.ts";
import {Box, Typography} from "@mui/material";
import TypeIcon from "../TypeIcon/TypeIcon.tsx";
import MoveClassIcon from "../MoveClassIcon/MoveClassIcon.tsx";
import {useNavigate} from "react-router-dom";
import {navName} from "../../global/utils.ts";

interface IMoveCardProps {
    move: PokemonMoveSnapshot | MoveSnapshot
}

function isPokemonMoveSnapshot(move: PokemonMoveSnapshot | MoveSnapshot): move is PokemonMoveSnapshot {
    return (move as PokemonMoveSnapshot).levelLearned !== undefined;
}

const MoveCard: FC<IMoveCardProps> = ({ move }) => {
    const naviagate = useNavigate()

    const handleNavigate = () => {
        naviagate(`/move/${navName(move.name)}`)
    }

    // secondLevel/cooldown are Legends: Arceus/Z-A-only extras -- see
    // PokemonMoveSnapshot in global/types.ts -- always absent for every
    // other game, so this branch never fires and every existing card
    // renders exactly as it did before these fields existed. The two games
    // never both set these on the same move, so cooldown's presence alone
    // tells the "Plus" (Z-A) vs "Mastery" (Arceus) label apart.
    const legendsSecondLevel = isPokemonMoveSnapshot(move) ? move.secondLevel : null;
    const isZA = isPokemonMoveSnapshot(move) && move.cooldown != null;
    const powerStrong = isPokemonMoveSnapshot(move) ? move.powerStrong : null;
    const powerAgile = isPokemonMoveSnapshot(move) ? move.powerAgile : null;
    const cooldown = isPokemonMoveSnapshot(move) ? move.cooldown : null;

    return (
        <Card type1={move.type} type2={null} onClick={handleNavigate}>
            <Box sx={{display: 'flex', gap: 4, alignItems: "center"}}>
                {isPokemonMoveSnapshot(move) && !!move.levelLearned && <SectionContainer>
                    <Typography variant="h5" color="white">Level</Typography>
                    <Typography variant="h5" color="white">{move.levelLearned}</Typography>
                </SectionContainer>}
                {legendsSecondLevel != null && <SectionContainer>
                    <Typography variant="h5" color="white">{isZA ? "Plus" : "Mastery"}</Typography>
                    <Typography variant="h5" color="white">{legendsSecondLevel}</Typography>
                </SectionContainer>}
                <Typography variant="h5" color="white">{move.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: 6}}>
                <SectionContainer>
                    <Typography variant="h5" color="white">{powerStrong != null ? "Power (Base)" : "Power"}</Typography>
                    <Typography variant="h5" color="white">{move.power ? move.power : "--"}</Typography>
                </SectionContainer>
                {powerStrong != null && <SectionContainer>
                    <Typography variant="h5" color="white">Power (St.)</Typography>
                    <Typography variant="h5" color="white">{powerStrong}</Typography>
                </SectionContainer>}
                {powerAgile != null && <SectionContainer>
                    <Typography variant="h5" color="white">Power (Ag.)</Typography>
                    <Typography variant="h5" color="white">{powerAgile}</Typography>
                </SectionContainer>}
                <SectionContainer>
                    <Typography variant="h5" color="white">Accuracy</Typography>
                    <Typography variant="h5" color="white">{move.accuracy ? move.accuracy : "--"}</Typography>
                </SectionContainer>
                <SectionContainer>
                    <Typography variant="h5" color="white">{cooldown != null ? "CD" : "PP"}</Typography>
                    <Typography variant="h5" color="white">{cooldown != null ? cooldown : (move.pp ? move.pp : "--")}</Typography>
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