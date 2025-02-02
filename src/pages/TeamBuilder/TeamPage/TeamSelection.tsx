import {useTeamCandidatesDetails} from "../../../services/api/hooks/useTeamCandidatesData.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../containers/loading/Loading.tsx";
import {Box, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {Card, TeamNameInput} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamView from "./components/TeamView.tsx";
import {useTeamStore} from "../../../store/teamStore.ts";
import {PokemonTeamMember, TeamCandidate} from "../../../global/types.ts";
import {FC, useEffect, useState} from "react";
import Filters from "../../../components/Filters/Filters.tsx";
import {PokemonType} from "../../../global/enums.ts";
import {versionGroupToStringMap} from "../utils.ts";
import ArrowBack from '@mui/icons-material/ArrowBack';
import DeleteTeamButton from "./components/DeleteTeamButton.tsx";
import ViewTeamButton from "./components/ViewTeamButton.tsx";

interface TeamSelectionProps {
    isCreateFlow?: boolean;
    isEditMode?: boolean;
}

const TeamSelection: FC<TeamSelectionProps> = ({isCreateFlow, isEditMode}) => {
    const { currentTeam, addPokemon, changeTeamName, startEditingTeam, createNewTeam } = useTeamStore();
    const { versionGroup, id } = useParams()
    const navigate = useNavigate()
    const { data, loading, error } = useTeamCandidatesDetails({versionString: versionGroup ?? versionGroupToStringMap.getByKey(currentTeam?.versionGroup) ?? 'national'});
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [typeFilters, setTypeFilters] = useState<PokemonType[]>([])
    const [genFilters, setGenFilters] = useState<number[]>([])
    const [editMode, setEditMode] = useState<boolean>(!!isEditMode)
    const [advancedOptions, setAdvancedOptions] = useState<boolean>(false)

    useEffect(() => {
        if (versionGroup) {
            createNewTeam(versionGroupToStringMap.getByValue(versionGroup) ?? null)
        } else if (id) {
            startEditingTeam(Number(id))
        }
    }, [versionGroup, id]);

    if (!isCreateFlow && !id) {
        throw new Error("No team with that id")
    }

    if (loading && !data.length) {
        return (<Loading />);
    }

    if (error) {
        throw new Error(error)
    }

    if (!currentTeam) {
        throw new Error("Team not found")
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
            moves: [null, null, null, null],
            abilityCandidates: [...mon.abilities],
            moveCandidates: [...mon.moves]
        }
        addPokemon(newMember);
    }

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <ArrowBack onClick={() => navigate('/team-builder')}/>
                <TeamNameInput
                    fullWidth
                    variant="standard"
                    placeholder="Enter Team Name"
                    disabled={!editMode}
                    value={currentTeam.name}
                    error={!currentTeam.name.length}
                    onChange={(e) => changeTeamName(e.target.value)}
                    slotProps={{
                        input: {disableUnderline: !!currentTeam.name.length}
                    }}
                />
                <Box sx={{display: 'flex', gap: 1}}>
                    {!isCreateFlow && <ViewTeamButton id={currentTeam.id} currentTeam={currentTeam}/>}
                    {!isCreateFlow && <DeleteTeamButton id={currentTeam.id}/>}
                </Box>
            </Box>
            <TeamView isCreateFlow={isCreateFlow} editMode={editMode} setEditMode={setEditMode} advancedOptions={advancedOptions} setAdvancedOptions={setAdvancedOptions}/>
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