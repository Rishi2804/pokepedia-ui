import {Skeleton} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import FiltersSkeleton from "../../../components/Skeletons/FiltersSkeleton/FiltersSkeleton.tsx";
import PokemonListSkeleton from "../../../components/Skeletons/PokemonListSkeleton/PokemonListSkeleton.tsx";
import {DexHeader} from "./Header/styles.ts";

const PokedexSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Pokedex">
            <DexHeader>
                <Skeleton variant="rounded" width={200} height={60}/>
                <TextSkeleton variant="h1" width={420} align="center"/>
            </DexHeader>
            <FiltersSkeleton types/>
            <PokemonListSkeleton count={24} header={false}/>
        </SkeletonScreen>
    )
}

export default PokedexSkeleton
