import {useTeamCandidatesDetails} from "../../../services/api/hooks/useTeamCandidatesData.ts";
import {useParams} from "react-router-dom";
import Loading from "../../../containers/loading/Loading.tsx";
import {Box, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamView from "./components/TeamView.tsx";
import {useTeamStore} from "../../../store/teamStore.ts";
import {PokemonTeamMember, TeamCandidate} from "../../../global/types.ts";
import {FC, useState} from "react";
import Filters from "../../../components/Filters/Filters.tsx";
import {PokemonType} from "../../../global/enums.ts";

interface TeamSelectionProps {
    isCreateFlow?: boolean;
    isEditMode?: boolean;
}

const TeamSelection: FC<TeamSelectionProps> = ({isEditMode}) => {
    const { versionGroup } = useParams();
    const { data, loading, error } = useTeamCandidatesDetails({versionString: versionGroup ?? ''});
    const { currentTeam, addPokemon } = useTeamStore();
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [typeFilters, setTypeFilters] = useState<PokemonType[]>([])
    const [genFilters, setGenFilters] = useState<number[]>([])
    const [editMode, setEditMode] = useState<boolean>(!!isEditMode)
    const [advancedOptions, setAdvancedOptions] = useState<boolean>(false)

    if (loading && !data.length) {
        return (<Loading />);
    }

    if (error) {
        throw new Error(error)
    }

    const handleAdd = (mon: TeamCandidate) => {
        if (currentTeam.pokemon.length === 6) return
        const newMember: PokemonTeamMember = {
            id: mon.id,
            name: mon.name,
            shiny: false,
            gender: mon.genderRate < 0 ? 'genderless' : mon.genderRate > 4 ? 'female' : 'male',
            genderLock: (mon.genderRate === -1 || mon.genderRate === 0 || mon.genderRate === 8),
            type1: mon.type1,
            type2: mon.type2,
            ability: mon.abilities[0],
            moves: [null, null, null, null]
        }
        addPokemon(mon, newMember);
    }

    return (
        <>
                <Typography variant="h1" sx={{textAlign: "center", padding: 2}}>{currentTeam.name}</Typography>
                <TeamView editMode={editMode} setEditMode={setEditMode} advancedOptions={advancedOptions} setAdvancedOptions={setAdvancedOptions}/>
                <Paper sx={{ px: 4, py: 2, display: editMode ? 'block' : 'none' }}>
                    <Filters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        typeFilters={typeFilters}
                        setTypeFilters={setTypeFilters}
                        genFilters={genFilters}
                        setGenFilters={setGenFilters}
                    />
                {
                    data.map((list, index) => {
                        return (
                            <Box sx={{width: '100%', paddingBottom: 2}} key={index}>
                                <Typography variant="h2">{list.listName}</Typography>
                                <Grid container spacing={1}>
                                {
                                    list.pokemon.map(mon => {
                                        if (searchTerm) {
                                            const regex = new RegExp(searchTerm, "i");
                                            if (!regex.test(mon.name)) {
                                                return null;
                                            }
                                        }

                                        if (typeFilters && typeFilters.length > 0) {
                                            if (!(typeFilters.includes(mon.type1) || (mon.type2 && typeFilters.includes(mon.type2)))) {
                                                return null;
                                            }
                                        }

                                        if (genFilters && genFilters.length > 0) {
                                            if (!genFilters.includes(mon.gen)) {
                                                return null;
                                            }
                                        }

                                        return (
                                            <Grid size={{xs: 1, sm: (12 / 15)}} key={mon.id}>
                                                <Card type1={mon.type1} type2={mon.type2} onClick={() => handleAdd(mon)}>
                                                    <PokemonImg id={mon.id} />
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                                </Grid>
                            </Box>
                        )
                    })
                }
                </Paper>
        </>
    );
};

export default TeamSelection;