import {Grid2 as Grid, Paper, Typography} from "@mui/material";
import {Card} from "../styles.ts";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {useTeamStore} from "../../../../store/teamStore.ts";
import ActionButtons from "./ActionButtons.tsx";
import {FC, useState} from "react";
import TypeDefensesTable from "./CoverageCharts/TypeDefensesTable.tsx";
import TypeCoverageTable from "./CoverageCharts/TypeCoverageTable.tsx";
import MemberCard from "./MemberCard.tsx";

interface TeamViewProps {
    isCreateFlow?: boolean;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    selectedSlot: number | null;
    setSelectedSlot: (slot: number | null) => void;
}

const TeamView: FC<TeamViewProps> = ({isCreateFlow, editMode, setEditMode, selectedSlot, setSelectedSlot}) => {
    const { currentTeam } = useTeamStore();
    const [showAnalysis, setShowAnalysis] = useState<boolean>(false)

    if (!currentTeam) throw new Error("No Team found")

    return (
        <Paper sx={{padding: 4, marginBottom: 3}}>
            <Grid container spacing={0.5}>
                {
                    [...Array(6)].map((_, i) => {
                        if (currentTeam.pokemon.length >= i + 1) {
                            return (
                                <MemberCard key={i} i={i} editMode={editMode} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>
                            )
                        }

                        return (
                            <Grid size={{xs: 2}} key={i}>
                                <Card type1={null} type2={null} sx={{marginBottom: 1}}>
                                    <PokemonImg id={0} />
                                </Card>
                                <Card type1={null} type2={null}>
                                    <Typography variant="h4" color={"#fff"}>???</Typography>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <ActionButtons
                isCreateFlow={isCreateFlow}
                editMode={editMode}
                setEditMode={setEditMode}
                showAnalysis={showAnalysis}
                setShowAnalysis={setShowAnalysis}
            />
            {
                showAnalysis && (
                    <>
                        <TypeDefensesTable />
                        <TypeCoverageTable />
                    </>
                )
            }
        </Paper>
    );
};

export default TeamView;