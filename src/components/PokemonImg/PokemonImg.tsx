import {useEffect, useState} from "react";

interface IPokemonImgProps {
    id: number
    shiny?: boolean,
    female?: boolean
}

const PokemonImg = ({id, shiny, female}: IPokemonImgProps) => {
    const [homeImg, setHomeImg] = useState<string>("")
    const [officialImg, setOfficialImg] = useState<string>("")
    const [imgPath, setImgPath] = useState<string>(homeImg)

    const [counter, setCounter] = useState<number>(0);

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
        setCounter(0)

        setImgPath(homeImgBuild)
    }, [id, shiny, female])

    useEffect(() => {
        if (homeImg && counter < 3) {
            // Increment the counter each time setHomeImg is called
            setCounter((prevCount) => prevCount + 1);
        }
    }, [homeImg, counter])

    function getImg() {
        return new URL(imgPath, import.meta.url).href
    }

    function onError() {
        setImgPath(officialImg)
    }

    return (
        <img src={getImg()} onError={onError} alt={`${id}`}/>
    )
}

export default PokemonImg