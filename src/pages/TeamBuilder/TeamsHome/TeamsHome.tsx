import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, IconButton, Typography} from "@mui/material";
import VersionGroupDialog from "./components/VersionGroupDialog.tsx";
import {useTeamStore} from "../../../store/teamStore.ts";
import {EmptyContainer, MemberContainer, TeamContainer} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamOptions from "./components/TeamOptions.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";
import {PokemonTeam} from "../../../global/types.ts";
import {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from '@mui/icons-material/Reorder';
import DoneIcon from '@mui/icons-material/Done';

const TeamsHome = () => {
    const { teams, setTeams } = useTeamStore()
    const [reorderTeams, setReorderTeams] = useState<boolean>(false)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const activeIndex = teams.findIndex((team) => team.id === active.id);
            const overIndex = teams.findIndex((team) => team.id === over?.id);
            if (activeIndex !== -1 && overIndex !== -1) {
                const reorderedTeams = arrayMove(teams, activeIndex, overIndex);
                setTeams(reorderedTeams);
            }
        }
    };

    return (
        <>
            <MetaData pageTitle={`Team Builder | PokePedia`} />
            <Typography variant="h1" sx={{padding: 3, textAlign: "center"}}>Team Builder</Typography>
            <VersionGroupDialog />
            <Typography variant="h2" sx={{marginY: 3, display: "flex", alignItems: "center", gap: 1}}>
                My Teams
                <IconButton onClick={() => setReorderTeams((prev) => !prev)}>
                    {reorderTeams ? <DoneIcon/> : <EditIcon/>}
                </IconButton>
            </Typography>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={teams.map(team => team.id)}>
            <Grid container spacing={2}>
                {
                    teams.map((team, index) => (
                        <TeamComponent team={team} key={index} draggable={reorderTeams}/>
                    ))
                }
            </Grid>
                </SortableContext>
            </DndContext>
        </>
    );
};

const TeamComponent = ({team, draggable}: {team: PokemonTeam, draggable: boolean}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: team.id})
    const sortableProps = {
        ref: setNodeRef,
        ...attributes,
        ...listeners,
        style: {
            transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
            transition: transition ?? "transform 200ms ease",
        }
    }

    return (
        <Grid size={{xs: 12, sm: 6}} {...(draggable ? sortableProps : {})}>
            <TeamContainer>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box />
                    <Typography variant="h5" textAlign="center">{team.name}</Typography>
                    {draggable ? <ReorderIcon /> : <TeamOptions id={team.id}/>}
                </Box>
                <Grid container spacing={1} sx={{marginTop: 2}}>
                    {
                        [...Array(6)].map((_, i) => (
                            <Grid size={2}>
                                {(i < team.pokemon.length) ? (
                                    <MemberContainer
                                        type1={team.pokemon[i].teraType ?? team.pokemon[i].type1}
                                        type2={team.pokemon[i].teraType ?? team.pokemon[i].type2}
                                    >
                                        <PokemonImg
                                            id={team.pokemon[i].id}
                                            shiny={team.pokemon[i].shiny}
                                            female={team.pokemon[i].gender === 'female'}
                                        />
                                    </MemberContainer>
                                ) : (<EmptyContainer />)}
                            </Grid>
                        ))
                    }
                </Grid>
            </TeamContainer>
        </Grid>
    );
};

export default TeamsHome;