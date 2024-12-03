import {styled} from "@mui/system";
import {Stack, Typography} from "@mui/material";

interface IInfoSectionProps {
    children?: React.ReactNode;
}

export const InfoSection = styled((props: IInfoSectionProps) =>
    <Stack direction="row" spacing={4} {...props} />
)({
    padding: '10px 0px 10px 5px',
    alignItems: "center"
});

export const AbilityText = styled(Typography)({
    '&:hover': {
        textDecoration: 'underline',
        transition: 'color 0.2s ease, text-decoration 0.2s ease',
    },

    '&:active': {
        transform: 'scale(0.98)',
        transition: 'transform 0.1s ease',
    },
})