import {Box, Paper, styled} from "@mui/material";

interface TeamOptionProps {
    selected?: boolean;
}

export const TeamOption = styled(Paper, {shouldForwardProp: prop => prop !== 'selected'})<TeamOptionProps>(({theme, selected}) => ({
    padding: theme.spacing(1.5),
    borderRadius: 8,
    cursor: 'pointer',
    border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.primaryBorder}`,
    backgroundColor: selected ? `${theme.palette.background.selected}20` : theme.palette.background.paper,
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

export const MemberRow = styled(Box)({
    display: 'flex',
    gap: 4,
    marginTop: 8,
});

export const MemberThumb = styled(Box)({
    width: 40,
    height: 40,
    '& img': {width: '100%', height: '100%', objectFit: 'contain'},
});
