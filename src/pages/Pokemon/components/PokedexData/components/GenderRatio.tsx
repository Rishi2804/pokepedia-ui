import {FC} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";
import {COLORS} from "../../../../../theme/styles/colors.ts";

interface IGenderRatioProps {
    genderRatio: number;
}

const GenderRatio: FC<IGenderRatioProps> = ({genderRatio}) => {
    const femaleRatio = ((genderRatio / 8) * 100).toFixed(2)
    const maleRatio = (((8 - genderRatio) / 8) * 100).toFixed(2)

    return (
        <InfoSection>
            <Typography>Gender</Typography>
            {
                genderRatio >= 0 ? (
                    <Stack sx={{alignItems: "center"}}>
                        <Box sx={{height: 20, width: '100%', display: 'flex', borderRadius: 3, overflow: 'hidden'}}>
                            <Box sx={{width: `${maleRatio}%`, backgroundColor: COLORS.MALE}}/>
                            <Box sx={{width: `${femaleRatio}%`, backgroundColor: COLORS.FEMALE}}/>
                        </Box>
                        <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
                            <Typography variant="body2" color={COLORS.MALE} textAlign="center">Male {maleRatio}%</Typography>
                            <Typography variant="body2" color={COLORS.FEMALE} textAlign="center">Female {femaleRatio}%</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Typography variant="body2" color={COLORS.GENDERLESS} textAlign="center">Genderless</Typography>
                )
            }
        </InfoSection>
    )
}

export default GenderRatio