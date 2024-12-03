import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useMoveDetails} from "../../../services/api/hooks/useMoveData.ts";
import {useEffect} from "react";
import {formatText} from "../../../global/utils.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import MoveData from "./components/MoveData/MoveData.tsx";
import MoveEffects from "./components/MoveEffects/MoveEffects.tsx";
import MoveDescriptions from "./components/MoveDescriptions/MoveDescriptions.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";


const Move = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useMoveDetails({moveIdOrName: id ?? 0})
    const navigate = useNavigate();

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            setSearchParams({ id: id }, {replace: true});
        } else {
            setSearchParams({}, {replace: true});
        }
    }, [id, searchParams]);

    useEffect(() => {
        if (id && !isNaN(Number(id)) && data) {
            const moveName = data.name.toLowerCase().replace(" ", "-");
            navigate(`/move/${moveName}`, { replace: true });
        }
    }, [id, data, navigate]);

    if (!data) {
        return null;
    }

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />
            <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3}}>{data.name}</Typography>
            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <MoveData
                    type={data.type}
                    category={data.moveClass}
                    power={data.movePower}
                    accuracy={data.moveAccuracy}
                    pp={data.movePP}
                />
                <MoveEffects
                    id={data.id}
                    type={data.type}
                    effect={data.effect}
                    pastMoveValues={data.pastMoveValues}
                    currPower={data.movePower}
                    currAccuracy={data.moveAccuracy}
                    currPP={data.movePP}
                    gen={data.gen}
                />
                <MoveDescriptions type={data.type} entries={data.descriptions}/>
                <Box sx={{width: '100%'}}>
                <Typography variant="h2">Pokemon that learn Move</Typography>
                <Typography variant="subtitle1" sx={{marginBottom: 2}}>Generalized across all versions</Typography>
                {
                    data.pokemonLearnable.map((list, index) => (
                        <PokemonList data={list.pokemon}
                                     header={<Typography variant="h3">{`Learnable By ${list.method}`}</Typography> }
                                     key={index}
                        />
                    ))
                }
                </Box>
            </Grid>
        </>
    );
};

export default Move;