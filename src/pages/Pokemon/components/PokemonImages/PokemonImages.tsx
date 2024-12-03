import {FC} from "react";
import {femaleImgs} from "../../../../components/PokemonImg/constants.ts";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {styled} from "@mui/system";

interface IPokemonImagesProps {
    id: number;
}

const ImgContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
})

const PokemonImages: FC<IPokemonImagesProps> = ({id}) => {
    if (femaleImgs.includes(id)) {
        return (
            <>
                <Grid size={12}><Typography variant="h2" id="Images">Images</Typography></Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <ImgContainer>
                        <PokemonImg id={id} />
                        <Typography variant="body2" textAlign="center">Regular</Typography>
                    </ImgContainer>
                </Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <ImgContainer>
                        <PokemonImg id={id} female />
                        <Typography variant="body2" textAlign="center">Female</Typography>
                    </ImgContainer>
                </Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <ImgContainer>
                        <PokemonImg id={id} shiny />
                        <Typography variant="body2" textAlign="center">Shiny</Typography>
                    </ImgContainer>
                </Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <ImgContainer>
                        <PokemonImg id={id} shiny female />
                        <Typography variant="body2" textAlign="center">Shiny Female</Typography>
                    </ImgContainer>
                </Grid>
            </>
        )
    }

    return (
        <>
        <Grid size={12}><Typography variant="h2" id="Images">Images</Typography></Grid>
            <Grid size={{xs: 0, sm: 3}}/>
            <Grid size={{xs: 5, sm: 3}}>
                <ImgContainer>
                    <PokemonImg id={id} />
                    <Typography variant="body2" textAlign="center">Regular</Typography>
                </ImgContainer>
            </Grid>
            <Grid size={{xs: 5, sm: 3}}>
                <ImgContainer>
                    <PokemonImg id={id} shiny />
                    <Typography variant="body2" textAlign="center">Shiny</Typography>
                </ImgContainer>
            </Grid>
            <Grid size={{xs: 0, sm: 3}} />
        </>
    )
};

export default PokemonImages;