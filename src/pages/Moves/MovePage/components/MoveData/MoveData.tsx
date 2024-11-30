import {FC} from "react";
import {MoveClass, PokemonType} from "../../../../../global/enums.ts";
import {Divider, Grid2 as Grid, Stack, Typography} from "@mui/material";
import MType from "./components/MType.tsx";
import MClass from "./components/MClass.tsx";
import {InfoSection} from "../../styles.tsx";

interface IMoveDataProps {
    type: PokemonType;
    category: MoveClass;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
}

const MoveData: FC<IMoveDataProps> = ({type, category, power, accuracy, pp}) => {
    return (
        <Grid size={{xs: 12, sm: 4}}>
            <Stack divider={<Divider orientation={"horizontal"} flexItem/>  }>
                <Typography variant="h2" sx={{marginBottom: 2}}>Data</Typography>
                <MType type={type} />
                <MClass mclass={category} />
                <InfoSection>
                    <Typography>Power</Typography>
                    <Typography>{power ? power : "--"}</Typography>
                </InfoSection><InfoSection>
                    <Typography>Accuracy</Typography>
                    <Typography>{accuracy ? accuracy : "--"}</Typography>
                </InfoSection><InfoSection>
                    <Typography>PP</Typography>
                    <Typography>{pp ? pp : "--"}</Typography>
                </InfoSection>
            </Stack>
            <Divider flexItem/>
        </Grid>
    );
};

export default MoveData;