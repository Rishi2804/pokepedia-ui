import {VersionGroup} from "../global/enums.ts";
import PokedexSelector from "../components/PokedexSelector/PokedexSelector.tsx";
import {VersionToImage} from "../global/utils.ts";

export const Pokedex = () => {
    return (
        <>
            <h1>Select a Game</h1>
            <div>

            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    Object.values(VersionGroup).map((key) => {
                        if (!VersionToImage[key as VersionGroup]) {
                            return (<></>)
                        }

                        return(
                            <PokedexSelector group={key as VersionGroup} key={key} />
                        )
                    })
                }
            </div>
        </>
    )
}