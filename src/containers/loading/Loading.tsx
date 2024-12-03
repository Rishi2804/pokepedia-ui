import {Box, CircularProgress, Typography} from "@mui/material";

const Loading = () => {
    return (
        <Box sx={{padding: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
            <Typography>Loading...</Typography>
        </Box>
    );
};

export default Loading;