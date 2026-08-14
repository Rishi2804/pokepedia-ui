import {Grid2 as Grid, Paper, Skeleton} from "@mui/material";

const SetEditorSkeleton = () => {
    return (
        <Paper sx={{px: 4, py: 2}}>
            <Skeleton variant="rounded" height={64} sx={{marginBottom: 2}}/>
            <Grid container spacing={2}>
                {[...Array(3)].map((_, i) => (
                    <Grid size={{xs: 12, sm: 4}} key={i}>
                        <Skeleton variant="rounded" height={320}/>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default SetEditorSkeleton;
