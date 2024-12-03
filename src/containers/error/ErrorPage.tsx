import ErrorIcon from '@mui/icons-material/Error';
import {Box, Typography} from "@mui/material";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {COLORS} from "../../theme/styles/colors.ts";

const ErrorPage = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4}}>
            <MetaData pageTitle={"Error | PokePedia"} />
            <ErrorIcon sx={{width: 150, height: 150, color: COLORS.RED}}/>
            <Typography variant="h1">Error</Typography>
            <Typography>Either the page you are looking for doesn't exist or the server is down</Typography>
        </Box>
    );
};

export default ErrorPage;