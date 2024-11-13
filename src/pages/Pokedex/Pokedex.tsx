import {useParams} from "react-router-dom";
import {urlToVersion} from "./utils.ts";
import {PokedexRegion, VersionGroup} from "../../global/enums.ts";
import {VersionToRegion} from "../../global/utils.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "./PokemonList/PokemonList.tsx";

const Pokedex = () => {
    const { versionGroup: group } =  useParams<{ versionGroup: string }>()

    let dexes: PokedexRegion[] = [PokedexRegion.NATIONAL];
    let version: VersionGroup | undefined = undefined;

    // Check if group is valid and exists in urlToVersion
    if (group && group in urlToVersion) {
        // Get the corresponding VersionGroup enum from the urlToVersion mapping
        version = urlToVersion[group];


        // Use VersionGroup to fetch the associated PokedexRegion array from VersionToRegion
        dexes = VersionToRegion[version];
    }

    return (
        <>
            <Header group={version} />
            {
                dexes.map((dex, index) => <PokemonList pokedex={dex} key={index}/>)
            }
        </>
    )
}

export default Pokedex