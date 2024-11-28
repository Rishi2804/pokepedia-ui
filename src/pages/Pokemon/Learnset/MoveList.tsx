import {FC} from "react";
import {PokemonMoveSnapshot} from "../../../global/types.ts";
import {Grid2 as Grid, Typography} from "@mui/material";
import MoveCard from "../../../components/MoveCard/MoveCard.tsx";

interface IMoveListProps {
    moves: PokemonMoveSnapshot[];
    title?: string;
}

const MoveList: FC<IMoveListProps> = ({moves, title}) => {
    return (
        <>
            <Typography variant="h3" sx={{marginBottom: 2}}>{title}</Typography>
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                {
                    moves.map((move, index) =>
                        (
                            <Grid size={{xs: 12, md: 6}}>
                                <MoveCard move={move} key={index}/>
                            </Grid>
                        ))
                }
            </Grid>
        </>
    );
};

export default MoveList;