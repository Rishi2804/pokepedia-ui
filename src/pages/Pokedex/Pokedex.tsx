import {useParams} from "react-router-dom";
import {urlToVersion} from "./utils.ts";
import {PokedexRegion} from "../../global/enums.ts";
import {VersionToRegion} from "../../global/utils.ts";


const Pokedex = () => {
    const { versionGroup: group } =  useParams<{ versionGroup: string }>()

    let dexes: PokedexRegion[] = [PokedexRegion.NATIONAL];

    // Check if group is valid and exists in urlToVersion
    if (group && group in urlToVersion) {
        // Get the corresponding VersionGroup enum from the urlToVersion mapping
        const versionKey = urlToVersion[group];

        // Use VersionGroup to fetch the associated PokedexRegion array from VersionToRegion
        dexes = VersionToRegion[versionKey];
    }

    return (
        <>
            {/*<Header />*/}
            {/*<PokemonList />*/}
            <ul>
                {dexes.map((region, index) => (
                    <li key={index}>{region}</li>
                ))}
            </ul>
        </>
    )
}

export default Pokedex