import {Grid2 as Grid, Typography} from "@mui/material";

const AbilityEffects = ({effect}: {effect: string}) => {
    return (
        <Grid size={12}>
            <Typography variant="h2" sx={{marginBottom: 1}} id={"Effects"}>Effects</Typography>
            <Typography sx={{marginBottom: 2}}>{effect ?? "No effect currently listed"}</Typography>
        </Grid>
    );
};

export default AbilityEffects;