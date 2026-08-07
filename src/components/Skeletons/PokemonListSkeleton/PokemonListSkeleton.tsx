import {Grid2 as Grid} from "@mui/material";
import {FC} from "react";
import PokemonCardSkeleton from "../PokemonCardSkeleton/PokemonCardSkeleton.tsx";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

interface IPokemonListSkeletonProps {
    count?: number;
    header?: boolean;
}

const PokemonListSkeleton: FC<IPokemonListSkeletonProps> = ({count, header}) => {
    return (
        <>
            {(header ?? true) && <TextSkeleton variant="h2" width={280} sx={{paddingBottom: 1.5}}/>}
            <Grid container spacing={2} sx={{paddingBottom: 6, width: '100%'}}>
                {[...Array(count ?? 24)].map((_, i) => (
                    <Grid size={{xs: 3, sm: 2, md: 1.5}} key={i}>
                        <PokemonCardSkeleton/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default PokemonListSkeleton
