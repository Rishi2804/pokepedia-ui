import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {PokemonType} from "../../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../../global/utils.ts";

type MoveButtonProps = {
    disabled: boolean;
    type?: PokemonType;
};

export const MoveButtonStyled = styled(Button)<MoveButtonProps>(
    ({ theme, disabled, type }) => {
        const baseBorderColor = disabled
            ? (theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.12)'
                : 'rgba(255,255,255,0.12)')
            : theme.palette.primary.main;

        const baseBackgroundColor = disabled
            ? 'transparent'
            : (theme.palette.mode === 'light'
                ? 'rgba(25,118,210,0.05)'
                : 'rgba(25,118,210,0.15)');

        const baseHoverBackground = theme.palette.mode === 'light'
            ? 'rgba(25,118,210,0.12)'
            : 'rgba(25,118,210,0.25)';

        const borderColor = type && !disabled
            ? TypeToCardBorder[type]
            : baseBorderColor;

        const backgroundColor = type && !disabled
            ? TypeToCardColor[type]
            : baseBackgroundColor;

        const hoverBackground = type && !disabled
            ? TypeToCardColor[type]
            : baseHoverBackground;

        return {
            fontWeight: 600,
            fontSize: '0.8rem',
            color: disabled
                ? theme.palette.text.secondary
                : theme.palette.text.primary,

            borderColor,
            backgroundColor,

            '&:hover': {
                backgroundColor: hoverBackground,
                borderColor,
            },

            textTransform: 'none',
            flex: 1,
            paddingTop: 8,
            paddingBottom: 8,
            textAlign: 'left',
        };
    });

export const MoveNameText = styled('div')({
    fontSize: 'inherit',
});

export const MovePPText = styled('div')(({ theme }) => ({
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
}));