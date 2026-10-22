import {FC} from "react";
import {Stack, Typography} from "@mui/material";
import {AbilityText, InfoSection} from "../styles.tsx";
import {useNavigate} from "react-router-dom";

interface IAbilitiesProps {
    abilities: {
        id: number;
        slug: string;
        name: string;
        isHidden: boolean;
        genRemoved: number | null;
    }[]
}

const Abilities: FC<IAbilitiesProps> = ({abilities}) => {
    const navigate = useNavigate()

    const handleNavigate = (abilitySlug: string) => {
        navigate(`/ability/${abilitySlug}`)
    }

    return (
        <InfoSection>
            <Typography>Abilities</Typography>
            <Stack>
                {
                    abilities.map((ability, index) => {
                        return (
                            <Stack direction="row" spacing={1} sx={{alignItems: "center"}} key={index}>
                                <AbilityText onClick={() => handleNavigate(ability.slug)}>{ability.name}</AbilityText>
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