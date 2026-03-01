import {FC} from "react";
import {specialImgs} from "./constants.ts";

interface IPokemonImgProps {
    id: number
    shiny?: boolean,
    female?: boolean
}

const BASE_URL: string = `${import.meta.env.VITE_POKEMON_IMAGES_URL}`;

const PokemonImg: FC<IPokemonImgProps> = ({id, shiny, female}) => {
    let folder: string = "home";
    if (specialImgs.includes(id)) {
        folder = "official";
    }

    let path = `${BASE_URL}/${folder}`

    if (shiny) {
        path += "/shiny"
    }

    if (female) {
        path += "/female"
    }

    const imgURL: string = `${path}/${id}.png`

    return (
        <img src={imgURL} alt={`${id}`}/>
    )
}

export default PokemonImg