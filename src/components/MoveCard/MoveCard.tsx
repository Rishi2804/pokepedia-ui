import {MoveSnapshot, PokemonMoveSnapshot} from "../../global/types.ts";
import {FC} from "react";
import {Card, SectionContainer} from "./styles.ts";
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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

    const legendsSecondLevel = isPokemonMoveSnapshot(move) ? move.secondLevel : null;
    const isZA = isPokemonMoveSnapshot(move) && move.cooldown != null;
    const powerStrong = isPokemonMoveSnapshot(move) ? move.powerStrong : null;
    const powerAgile = isPokemonMoveSnapshot(move) ? move.powerAgile : null;
    const cooldown = isPokemonMoveSnapshot(move) ? move.cooldown : null;

    const legendsExtras: string[] = [];
    if (legendsSecondLevel != null) {
        legendsExtras.push(`${isZA ? "Plus" : "Mastery"}: ${legendsSecondLevel}`);
    }
    if (powerStrong != null) {
        legendsExtras.push(`Power (Strong Style): ${powerStrong}`);
    }
    if (powerAgile != null) {
        legendsExtras.push(`Power (Agile Style): ${powerAgile}`);
    }

    return (
        <Card type1={move.type} type2={null} onClick={handleNavigate}>
            <Box sx={{display: 'flex', gap: 4, alignItems: "center"}}>
                {isPokemonMoveSnapshot(move) && !!move.levelLearned && <SectionContainer>
                    <Typography variant="h5" color="white">Level</Typography>
                    <Typography variant="h5" color="white">{move.levelLearned}</Typography>
                </SectionContainer>}
                <Box sx={{display: 'flex', alignItems: "center", gap: 0.5}}>
                    <Typography variant="h5" color="white">{move.name}</Typography>
                    {legendsExtras.length > 0 && (
                        <Tooltip
                            title={<Stack spacing={0.5}>{legendsExtras.map(line => <span key={line}>{line}</span>)}</Stack>}
                        >
                            <InfoOutlinedIcon
                                sx={{color: "white", fontSize: 18}}
                                onClick={e => e.stopPropagation()}
                            />
                        </Tooltip>
                    )}
                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 6}}>
                <SectionContainer>
                    <Typography variant="h5" color="white">Power</Typography>
                    <Typography variant="h5" color="white">{move.power ? move.power : "--"}</Typography>
                </SectionContainer>
                {cooldown == null && <SectionContainer>
                    <Typography variant="h5" color="white">Accuracy</Typography>
                    <Typography variant="h5" color="white">{move.accuracy ? move.accuracy : "--"}</Typography>
                </SectionContainer>}
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
