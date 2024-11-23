import {FC} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";

interface IGenderRatioProps {
    genderRatio: number;
}

const GenderRatio: FC<IGenderRatioProps> = ({genderRatio}) => {
    const MALE = "#3355FF"
    const FEMALE = "#FF77DD"
    const GENDERLESS = "#808080"
    const femaleRatio = ((genderRatio / 8) * 100).toFixed(2)
    const maleRatio = (((8 - genderRatio) / 8) * 100).toFixed(2)

    return (
        <InfoSection>
            <Typography>Gender</Typography>
            {
                genderRatio > 0 ? (
                    <Stack sx={{alignItems: "center"}}>
                        <Box sx={{height: 20, width: '100%', display: 'flex', borderRadius: 3, overflow: 'hidden'}}>
                            <Box sx={{width: `${maleRatio}%`, backgroundColor: MALE}}/>
                            <Box sx={{width: `${femaleRatio}%`, backgroundColor: FEMALE}}/>
                        </Box>
                        <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
                            <Typography variant="body2" color={MALE} textAlign="center">Male {maleRatio}%</Typography>
                            <Typography variant="body2" color={FEMALE} textAlign="center">Female {femaleRatio}%</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Typography variant="body2" color={GENDERLESS} textAlign="center">Genderless</Typography>
                )
            }
        </InfoSection>
    )
}

export default GenderRatio