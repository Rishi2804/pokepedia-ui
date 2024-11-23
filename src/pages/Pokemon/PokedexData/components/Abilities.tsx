import {FC} from "react";
import {Stack, Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";

interface IAbilitiesProps {
    abilities: {
        abilityId: number;
        abilityName: string;
        isHidden: boolean;
        genRemoved: number | null;
    }[]
}

const Abilities: FC<IAbilitiesProps> = ({abilities}) => {

    return (
        <InfoSection>
            <Typography>Abilities</Typography>
            <Stack>
                {
                    abilities.map((ability) => {
                        return (
                            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                                <Typography>{ability.abilityName}</Typography>
                                {ability.genRemoved && <Typography variant="caption">(Gen {ability.genRemoved} and prior)</Typography>}
                                {ability.isHidden && <Typography variant="caption">(Hidden Ability)</Typography>}
                            </Stack>
                        )
                    })
                }
            </Stack>
        </InfoSection>
    )
}

export default Abilities