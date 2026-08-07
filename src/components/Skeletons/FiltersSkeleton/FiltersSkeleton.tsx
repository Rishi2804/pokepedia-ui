import {Box, Skeleton} from "@mui/material";
import {FC} from "react";

interface IFiltersSkeletonProps {
    types?: boolean;
    gens?: boolean;
}

const FiltersSkeleton: FC<IFiltersSkeletonProps> = ({types, gens}) => {
    return (
        <Box sx={{flexDirection: 'row', display: 'flex', gap: 2}}>
            <Skeleton variant="rounded" height={56} sx={{width: '100%', marginBottom: 2, marginTop: 1}}/>
            {types && <Skeleton variant="rounded" height={56} sx={{width: '40%', m: 1}}/>}
            {gens && <Skeleton variant="rounded" height={56} sx={{width: '20%', m: 1}}/>}
        </Box>
    )
}

export default FiltersSkeleton
