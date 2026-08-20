import {Box, ButtonBase, styled} from "@mui/material";

export const ButtonGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: 8,
});

interface MoveButtonProps {
    typeColor: string;
    borderColor: string;
}

export const MoveButton = styled(ButtonBase, {
    shouldForwardProp: prop => prop !== 'typeColor' && prop !== 'borderColor',
})<MoveButtonProps>(({typeColor, borderColor}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
    padding: '8px 10px',
    borderRadius: 10,
    border: `2px solid ${borderColor}`,
    backgroundColor: typeColor,
    color: '#fff',
    textAlign: 'left',
    transition: 'transform 0.15s ease, opacity 0.15s ease',
    '&:hover': {transform: 'translateY(-1px)'},
    '&:active': {transform: 'scale(0.98)'},
    '&.Mui-disabled': {opacity: 0.4},
}));

export const SwitchButton = styled(ButtonBase)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '6px 10px',
    borderRadius: 10,
    border: `1px solid ${theme.palette.primaryBorder}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    textAlign: 'left',
    transition: 'border-color 0.15s ease, opacity 0.15s ease',
    '&:hover': {borderColor: theme.palette.primary.main},
    '&.Mui-disabled': {opacity: 0.4},
}));

export const SwitchThumb = styled(Box)({
    width: 32,
    height: 32,
    flexShrink: 0,
    '& img': {width: '100%', height: '100%', objectFit: 'contain'},
});
