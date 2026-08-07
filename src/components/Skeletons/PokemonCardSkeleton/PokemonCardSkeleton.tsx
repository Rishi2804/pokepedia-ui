import {Box, Skeleton} from "@mui/material";
import {CardShell, IconRow} from "./styles.ts";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

const PokemonCardSkeleton = () => {
    return (
        <CardShell>
            <TextSkeleton width={32} sx={{paddingLeft: 1}}/>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'auto', aspectRatio: '1 / 1'}}/>
            <Box sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
                <TextSkeleton variant="h5" width="70%" align="center"/>
                <IconRow>
                    <Skeleton variant="circular" width={30} height={30}/>
                    <Skeleton variant="circular" width={30} height={30}/>
                </IconRow>
            </Box>
        </CardShell>
    )
}

export default PokemonCardSkeleton
