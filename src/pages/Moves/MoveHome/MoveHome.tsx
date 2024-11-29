import {useMovesDetails} from "../../../services/api/hooks/useMovesData.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import Filters from "../../Pokedex/PokedexPage/Filters/Filters.tsx";
import {Box, Typography} from "@mui/material";
import {useState} from "react";
import {PokemonType} from "../../../global/enums.ts";
import MoveList from "../../../components/MoveList/MoveList.tsx";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";

const MoveHome = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [typefilters, settypefilters] = useState<PokemonType[]>([])

    const { data } = useMovesDetails();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setSearchTerm(event.currentTarget.value);
        }
    };

    return (
        <>
            <MetaData pageTitle={`Attackdex | PokePedia`} />
            <Typography variant="h1" sx={{paddingY: 5, textAlign: "center"}}>Pokemon Attackdex</Typography>
            <QuickScroll items={data.map((_item, index) => `Gen ${index+1}`)} heading={"Jump to:"}/>
            <Filters
                searchBoxText={"Search Moves"}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleKeyDown={handleKeyDown}
                typeFilters={typefilters}
                setTypeFilters={settypefilters}
            />
            {
                data.map((moveList, index) => {
                    return (
                        <Box key={index} id={"Gen " + (index + 1)}>
                            <MoveList
                                moves={moveList}
                                title={"Gen " + (index + 1)}
                                searchTerm={searchTerm}
                                typeFilters={typefilters}
                            />
                        </Box>
                    )
                })
            }

        </>
    );
};

export default MoveHome;