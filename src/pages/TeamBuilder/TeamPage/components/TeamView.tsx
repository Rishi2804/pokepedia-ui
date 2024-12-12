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
    advancedOptions: boolean;
    setAdvancedOptions: (mode: boolean) => void;
}

const TeamView: FC<TeamViewProps> = ({isCreateFlow, editMode, setEditMode, advancedOptions, setAdvancedOptions}) => {
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
                                <MemberCard i={i} editMode={editMode} advancedOptions={advancedOptions}/>
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
                advancedOptions={advancedOptions}
                setAdvancedOptions={setAdvancedOptions}
                showAnalysis={showAnalysis}
                setShowAnalysis={setShowAnalysis}
            />
            {
                showAnalysis && (
                    <>
                        <TypeDefensesTable />
                        {advancedOptions && <TypeCoverageTable />}
                    </>
                )
            }
        </Paper>
    );
};

export default TeamView;