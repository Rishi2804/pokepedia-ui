import { Paper } from "@mui/material";
import { styled } from "@mui/system";

// Define the types for the custom props
interface CardProps {
    color: string;
    borderColor: string;
}

export const Card = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'borderColor', // Avoid passing these props down to Paper
})<CardProps>(({ color, borderColor }) => ({
    borderColor: borderColor,
    backgroundColor: color,
    borderWidth: 3,
    borderRadius: 15,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    display: "flex",
    padding: 1,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    flexDirection: "column",

    "&:active": {
        transform: "scale(0.95)",
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
    },
}));
