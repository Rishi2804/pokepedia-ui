import {FC} from "react";
import {Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";

interface IMeasureProps {
    height: number;
    weight: number;
}

const NationalDexNumber: FC<IMeasureProps> = ({height, weight}) => {
    const metersToFeet = (meters: number): string => {
        const totalFeet = meters * 3.28084;  // Convert meters to feet
        const feet = Math.floor(totalFeet);  // Get the whole feet part
        const inches = Math.round((totalFeet - feet) * 12);  // Convert fractional feet to inches

        // Ensure inches are always two digits (e.g., 5'07" instead of 5'7")
        const formattedInches = inches < 10 ? `0${inches}` : inches;

        return `${feet}'${formattedInches}"`;  // Return in the format "X'YY"
    }

    const kgToPounds = (kg: number): string => {
        const pounds = kg * 2.20462;
        return pounds.toFixed(2);  // Return the result rounded to 2 decimal places
    }


    return (
        <>
            <InfoSection>
                <Typography>Height</Typography>
                <Typography>{height.toFixed(1)} m ({metersToFeet(height)})</Typography>
            </InfoSection>
            <InfoSection>
                <Typography>Weight</Typography>
                <Typography>{weight.toFixed(2)} kg ({kgToPounds(weight)} lbs)</Typography>
            </InfoSection>
        </>
    )
}

export default NationalDexNumber