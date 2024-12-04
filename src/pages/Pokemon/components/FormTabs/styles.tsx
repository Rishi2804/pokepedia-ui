import {styled} from "@mui/system";
import {Tabs, Tab, alpha} from "@mui/material";

export const StyledTabs = styled(Tabs, {
    shouldForwardProp: (prop) => prop !== 'condensed', // Prevent `ability` prop from being passed to the DOM
})<{ condensed?: boolean; }>(({ theme, condensed }) => ({
    backgroundColor: theme.palette.background.default,
    display: "inline-flex",
    borderRadius: 15,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
    },

    ...(condensed && {
        padding: 0,
        marginTop: 0
    })
}));

interface StyledTabProps {
    label: string;
    condensed?: boolean;
}

export const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme, condensed }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: 15,
    color: theme.palette.text.primary,
    '&.Mui-selected': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.primaryBorder}`,
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        color: theme.palette.background.selected,

    },

    ...(condensed && {
        marginRight: 0
    })
}));