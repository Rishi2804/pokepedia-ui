import {useParams} from "react-router-dom";
import {useMoveDetails} from "../../../services/api/hooks/useMoveData.ts";
import {formatText} from "../../../global/utils.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import MoveData from "./components/MoveData/MoveData.tsx";
import MoveEffects from "./components/MoveEffects/MoveEffects.tsx";
import MoveDescriptions from "./components/MoveDescriptions/MoveDescriptions.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Loading from "../../../containers/loading/Loading.tsx";


const Move = () => {
    const { id } = useParams();
    const { data, loading } = useMoveDetails({moveIdOrName: id ?? 0})

    if (loading) {
        return (
            <Loading />
        )
    }

    if (!data) {
        return null;
    }

    const sections = ["Data", "Effects", "Descriptions", ...data.pokemonLearnable.map(list => `Learnable By ${list.method}`)]

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />
            <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3, marginBottom: 3}}>{data.name}</Typography>
            <QuickScroll items={sections} heading={"Content:"} />
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
                                     header={<Typography variant="h3" id={`Learnable By ${list.method}`}>
                                         {`Learnable By ${list.method}`}
                                            </Typography> }
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