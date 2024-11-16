import {useEffect, useState} from "react";

interface IPokemonImgProps {
    id: number
    shiny?: boolean,
    female?: boolean
}

const PokemonImg = ({id, shiny, female}: IPokemonImgProps) => {
    const [homeImg, setHomeImg] = useState<string>("")
    const [officialImg, setOfficialImg] = useState<string>("")

    useEffect(() => {
        let homeImgBuild: string = `./assets/home`
        let artworkImg: string = `./assets/official`
        if (shiny) {
            homeImgBuild += "/shiny"
            artworkImg += "/shiny"
        }
        if (female) {
            homeImgBuild += "/female"
            artworkImg += "/female"
        }
        homeImgBuild += `/${id}.png`
        artworkImg += `/${id}.png`
        setHomeImg(homeImgBuild)
        setOfficialImg(artworkImg)

    }, [id, shiny, female])

    function getImg() {
        const specialImgs = [10158, 10159, 10061, 10181, 10182, 10183, 10187, 10192]
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