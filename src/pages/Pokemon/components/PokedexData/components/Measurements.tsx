import {FC} from "react";
import {Divider, Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";

interface IMeasureProps {
    height: number;
    weight: number;
}

const NationalDexNumber: FC<IMeasureProps> = ({height, weight}) => {
    const metersToFeet = (meters: number): string => {
        const totalFeet = meters * 3.28084;
        const feet = Math.floor(totalFeet);
        const inches = Math.round((totalFeet - feet) * 12);
        const formattedInches = inches < 10 ? `0${inches}` : inches;

        return `${feet}'${formattedInches}"`;
    }

    const kgToPounds = (kg: number): string => {
        const pounds = kg * 2.20462;
        return pounds.toFixed(2);
    }


    return (
        <>
            <InfoSection>
                <Typography>Height</Typography>
                <Typography>{height.toFixed(1)} m ({metersToFeet(height)})</Typography>
            </InfoSection>
            <Divider flexItem/>
            <InfoSection>
                <Typography>Weight</Typography>
                <Typography>{weight.toFixed(2)} kg ({kgToPounds(weight)} lbs)</Typography>
            </InfoSection>
        </>
    )
}

export default NationalDexNumber