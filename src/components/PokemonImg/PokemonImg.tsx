import {FC, useEffect, useState} from "react";
import {femaleImgs, specialImgs} from "./constants.ts";

interface IPokemonImgProps {
    id: number
    shiny?: boolean,
    female?: boolean
}

const PokemonImg: FC<IPokemonImgProps> = ({id, shiny, female}) => {
    const [homeImg, setHomeImg] = useState<string>("")
    const [officialImg, setOfficialImg] = useState<string>("")

    useEffect(() => {
        let homeImgBuild: string = `./assets/home`
        let artworkImg: string = `./assets/official`
        if (shiny) {
            homeImgBuild += "/shiny"
            artworkImg += "/shiny"
        }
        if (female && femaleImgs.includes(id)) {
            homeImgBuild += "/female"
            artworkImg += "/female"
        }
        homeImgBuild += `/${id}.png`
        artworkImg += `/${id}.png`
        setHomeImg(homeImgBuild)
        setOfficialImg(artworkImg)

    }, [id, shiny, female])

    function getImg() {
        if (specialImgs.includes(id)) {
            return new URL(officialImg, import.meta.url).href
        }

        return new URL(homeImg, import.meta.url).href
    }

    return (
        <img src={getImg()} alt={`${id}`}/>
    )
}

export default PokemonImg