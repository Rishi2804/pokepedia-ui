import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import FiltersSkeleton from "../../../components/Skeletons/FiltersSkeleton/FiltersSkeleton.tsx";
import MoveListSkeleton from "../../../components/Skeletons/MoveListSkeleton/MoveListSkeleton.tsx";

const MoveHomeSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Attackdex">
            <TextSkeleton variant="h1" width={420} align="center" sx={{paddingY: 5}}/>
            <QuickScrollSkeleton count={9}/>
            <FiltersSkeleton types/>
            <MoveListSkeleton count={10}/>
        </SkeletonScreen>
    )
}

export default MoveHomeSkeleton
