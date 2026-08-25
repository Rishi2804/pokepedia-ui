import SkeletonScreen from "../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import RowsSkeleton from "../../components/Skeletons/RowsSkeleton/RowsSkeleton.tsx";

const SearchSkeleton = () => {
    return (
        <SkeletonScreen label="Loading search results">
            <TextSkeleton variant="h1" width={320} align="center" sx={{paddingY: 5}}/>
            <RowsSkeleton heading headingWidth={140} rows={4}/>
            <RowsSkeleton heading headingWidth={140} rows={4}/>
        </SkeletonScreen>
    )
}

export default SearchSkeleton
