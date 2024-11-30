import {Grid2 as Grid, Typography} from "@mui/material";
import {FC} from "react";

interface IMoveEffectsProps {
    effect: string;
}

const MoveEffects: FC<IMoveEffectsProps> = ({effect}) => {
    return (
        <Grid size={{xs: 17, sm: 8}}>
            <Typography variant="h2" sx={{marginBottom: 2}}>Effects</Typography>
            <Typography>{effect ?? "No effect currently listed"}</Typography>
        </Grid>
    );
};

export default MoveEffects;