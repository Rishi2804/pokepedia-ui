import {useTeamCandidatesDetails} from "../../../services/api/hooks/useTeamCandidatesData.ts";
import {useNavigate, useParams} from "react-router-dom";
import TeamSelectionSkeleton from "./TeamSelectionSkeleton.tsx";
import {Box, Button, Collapse, Grid2 as Grid, Paper, Typography} from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {Card, TeamNameInput} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamView from "./components/TeamView.tsx";
import {useTeamStore} from "../../../store/teamStore.ts";
import {TeamCandidateSummary} from "../../../global/types.ts";
import {FC, useEffect, useState} from "react";
import Filters from "../../../components/Filters/Filters.tsx";
import {PokemonType} from "../../../global/enums.ts";
import {versionGroupFromSlug, versionGroupToSlug} from "../../../global/labels.ts";
import ArrowBack from '@mui/icons-material/ArrowBack';
import DeleteTeamButton from "./components/DeleteTeamButton.tsx";
import ViewTeamButton from "./components/ViewTeamButton.tsx";
import SetEditor from "./components/SetEditor/SetEditor.tsx";
import TeamValidationPanel from "./components/TeamValidationPanel.tsx";
import ImportExport from "./components/SetEditor/ImportExport.tsx";
import {getGenRules} from "../genRules.ts";
import {useQueryClient} from "@tanstack/react-query";
import {exportTeam} from "../utils/showdownText.ts";
import {importTeamText} from "../utils/importTeam.ts";
import {battleFormatKeyFor} from "../utils/battleFormat.ts";
import {useHoldableItems} from "../../../services/api/hooks/useHoldableItems.ts";

interface TeamSelectionProps {
    isCreateFlow?: boolean;
    isEditMode?: boolean;
}

const TeamSelection: FC<TeamSelectionProps> = ({isCreateFlow, isEditMode}) => {
    const { currentTeam, addPokemon, duplicatePokemon, removePokemon, setCurrentTeam, changeTeamName, startEditingTeam, createNewTeam } = useTeamStore();
    const { versionGroup, id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const versionSlug = versionGroup ?? (currentTeam?.versionGroup ? versionGroupToSlug(currentTeam.versionGroup) : undefined) ?? 'national';
    const { data, isPending, error } = useTeamCandidatesDetails(versionSlug);
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [typeFilters, setTypeFilters] = useState<PokemonType[]>([])
    const [genFilters, setGenFilters] = useState<number[]>([])
    const [editMode, setEditMode] = useState<boolean>(!!isEditMode)
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
    const [showTeamImportExport, setShowTeamImportExport] = useState<boolean>(false)
    // Names items on export; the same per-format query the item picker uses.
    const items = useHoldableItems(
        battleFormatKeyFor(currentTeam?.versionGroup ?? null),
        !!currentTeam && getGenRules(currentTeam.versionGroup).items,
    ).data ?? [];

    useEffect(() => {
        if (versionGroup) {
            createNewTeam(versionGroupFromSlug(versionGroup) ?? null)
        } else if (id) {
            startEditingTeam(Number(id))
        }
    }, [versionGroup, id]);

    if (!isCreateFlow && !id) {
        throw new Error("No team with that id")
    }

    if (isPending) {
        return (<TeamSelectionSkeleton />);
    }

    if (error) {
        throw error
    }

    if (!currentTeam) {
        throw new Error("Team not found")
    }

    const allCandidates: TeamCandidateSummary[] = data.flatMap(group => group.pokemon);
    const rules = getGenRules(currentTeam.versionGroup);

    // The roster keeps showing whatever forme was picked, Mega included -
    // only the item is pre-filled here. The actual submitted species/item
    // (and the ability/stat pool the editor works against) get redirected to
    // the base species elsewhere - see SetEditor.tsx and the battle server's
    // teamConvert.ts, since a battle-only forme can never legally be a team's
    // submitted species (showdownSpecies.ts's resolveBattleOnlyBase).
    const handleAdd = (mon: TeamCandidateSummary) => {
        if (currentTeam.pokemon.length === 6) return
        const newIndex = currentTeam.pokemon.length;
        addPokemon(mon, mon.battleOnly?.requiredItem?.showdownId, mon.battleOnly?.gigantamax);
        setSelectedSlot(newIndex);
    }

    const handleCopy = () => {
        if (selectedSlot === null || currentTeam.pokemon.length >= 6) return;
        const newIndex = currentTeam.pokemon.length;
        duplicatePokemon(selectedSlot);
        setSelectedSlot(newIndex);
    }

    const handleRemoveSelected = () => {
        if (selectedSlot === null) return;
        removePokemon(selectedSlot);
        setSelectedSlot(null);
    }

    const handleImportTeam = async (text: string): Promise<string[]> => {
        const {members, errors} = await importTeamText({
            text, allCandidates, versionGroup: currentTeam.versionGroup, versionSlug, rules, queryClient,
        });
        if (members.length) {
            setCurrentTeam({...currentTeam, pokemon: members});
            setSelectedSlot(null);
        }
        return errors;
    }

    const selectedMember = selectedSlot !== null ? currentTeam.pokemon[selectedSlot] : undefined;

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
                    <Button startIcon={<ImportExportIcon/>} onClick={() => setShowTeamImportExport(v => !v)}>
                        {showTeamImportExport ? 'Hide' : 'Show'} Team Import/Export
                    </Button>
                    {!isCreateFlow && <ViewTeamButton id={currentTeam.id} currentTeam={currentTeam}/>}
                    {!isCreateFlow && <DeleteTeamButton id={currentTeam.id}/>}
                </Box>
            </Box>
            <Collapse in={showTeamImportExport}>
                <ImportExport
                    label="Team"
                    exportText={exportTeam(currentTeam.pokemon, rules, items, allCandidates)}
                    onImport={handleImportTeam}
                    disabled={!editMode}
                />
            </Collapse>
            <TeamView isCreateFlow={isCreateFlow} editMode={editMode} setEditMode={setEditMode} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>
            <TeamValidationPanel members={currentTeam.pokemon} versionGroup={currentTeam.versionGroup} candidates={allCandidates}/>
            {
                selectedMember ? (
                    <SetEditor
                        member={selectedMember}
                        slot={selectedSlot as number}
                        editMode={editMode}
                        versionGroup={currentTeam.versionGroup}
                        candidates={allCandidates}
                        canCopy={currentTeam.pokemon.length < 6}
                        onClose={() => setSelectedSlot(null)}
                        onCopy={handleCopy}
                        onRemove={handleRemoveSelected}
                    />
                ) : (
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
                )
            }
        </>
    );
};

export default TeamSelection;