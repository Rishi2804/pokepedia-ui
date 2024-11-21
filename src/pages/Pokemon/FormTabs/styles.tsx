import {styled} from "@mui/system";
import { Tabs, Tab } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.primaryBorder}`,
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
}));

interface StyledTabProps {
    label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    marginRight: theme.spacing(1),
    backgroundColor: 'black',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    border: `1px solid ${theme.palette.primaryBorder}`,
    color: 'white',
    '&.Mui-selected': {
        backgroundColor: theme.palette.background.paper,
        color: 'white',
        borderBottom: theme.palette.background.paper
    },
    '&:hover': {
        color: theme.palette.background.selected
    },
}));