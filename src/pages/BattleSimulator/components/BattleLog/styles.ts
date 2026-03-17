import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

export const LogContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 2.4,
    backgroundColor: theme.palette.background.paper,
}));

export const LogEmpty = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    textAlign: 'center',
    marginTop: 32,
}));

export const LogEntry = styled(Typography)({
    fontSize: '0.8rem',
    fontFamily: '"Share Tech Mono", monospace',
    lineHeight: 1.6,
});