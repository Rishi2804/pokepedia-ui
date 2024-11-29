import {FC, ReactNode} from "react";
import {MoveSnapshot, PokemonMoveSnapshot} from "../../global/types.ts";
import {Grid2 as Grid, Typography} from "@mui/material";
import MoveCard from "../MoveCard/MoveCard.tsx";
import {PokemonType} from "../../global/enums.ts";

interface IMoveListProps {
    moves: PokemonMoveSnapshot[] | MoveSnapshot[];
    title?: ReactNode;
    searchTerm?: string;
    typeFilters?: PokemonType[];
}

const MoveList: FC<IMoveListProps> = ({moves, title, searchTerm, typeFilters}) => {
    return (
        <>
            <Typography variant="h2" sx={{marginBottom: 2}}>{title}</Typography>
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                {
                    moves.map((move, index) => {

                        if (searchTerm) {
                            const regex = new RegExp(searchTerm, "i");
                            if (!regex.test(move.name)) {
                                return null;
                            }
                        }

                        if (typeFilters && typeFilters.length > 0) {
                            if (!typeFilters.includes(move.type)) {
                                return null;
                            }
                        }

                        return (
                            <Grid size={{xs: 12, md: 6}}>
                                <MoveCard move={move} key={index}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default MoveList;