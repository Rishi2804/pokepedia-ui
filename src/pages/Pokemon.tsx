import {useParams} from "react-router-dom";
import {useSpeciesDetails} from "../services/api/hooks/useSpeciesData.ts";

const Pokemon = () => {
    const { id } = useParams();
    const { data } = useSpeciesDetails({speciesIdOrName: id ?? 0})
    console.log(data)
    return (
        <>
            <p>{data?.name}</p>
        </>
    )
}

export default Pokemon