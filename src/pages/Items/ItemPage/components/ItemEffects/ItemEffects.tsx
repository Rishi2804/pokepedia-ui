import {FC} from "react";
import {Grid2 as Grid, Typography} from "@mui/material";

interface IItemEffectsProps {
    effect: string;
    shortEffect: string;
}

// The API sends "" when PokeAPI has no effect text, so the fallback tests for
// emptiness rather than null. The one-line summary stands in when only it exists.
const ItemEffects: FC<IItemEffectsProps> = ({effect, shortEffect}) => {
    return (
        <Grid size={12}>
            <Typography variant="h2" sx={{marginBottom: 1}} id={"Effects"}>Effects</Typography>
            <Typography sx={{marginBottom: 2}}>{effect || shortEffect || "No effect currently listed"}</Typography>
        </Grid>
    );
};

export default ItemEffects;
