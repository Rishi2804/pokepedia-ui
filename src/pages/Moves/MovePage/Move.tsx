import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useMoveDetails} from "../../../services/api/hooks/useMoveData.ts";
import {useEffect} from "react";
import {formatText} from "../../../global/utils.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Grid2 as Grid, Typography} from "@mui/material";
import MoveData from "./components/MoveData/MoveData.tsx";
import MoveEffects from "./components/MoveEffects/MoveEffects.tsx";


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
                <MoveEffects effect={data.effect}/>
            </Grid>
        </>
    );
};

export default Move;