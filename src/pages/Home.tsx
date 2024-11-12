import PokemonImg from "../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../components/TypeIcon/TypeIcon.tsx";
import {PokemonType} from "../global/enums.ts";

export const Home = () => {
    return (
        <>
            <h1>Home Page</h1>
            <PokemonImg id={448} />
            <TypeIcon type={PokemonType.ELECTRIC} variant={"outlined"} />
        </>


    )
}