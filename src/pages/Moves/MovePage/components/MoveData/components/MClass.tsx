import {Box, Stack, Typography} from "@mui/material";
import {InfoSection} from "../../../styles.tsx";
import {MoveClass} from "../../../../../../global/enums.ts";
import MoveClassIcon from "../../../../../../components/MoveClassIcon/MoveClassIcon.tsx";

const MClass = ({mclass}: {mclass: MoveClass}) => {
    return (
        <InfoSection>
            <Box sx={{width:'25%'}}>
                <Typography textAlign="right">Category</Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                <MoveClassIcon mClass={mclass} />
                <Typography>{mclass[0].toUpperCase() + mclass.substring(1)}</Typography>
            </Stack>
        </InfoSection>
    );
};

export default MClass;