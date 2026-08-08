import {FC} from "react";
import {Box, Button, Grid2 as Grid, IconButton, Paper, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PokemonImg from "../../../../../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import {useTeamCandidateDetails} from "../../../../../services/api/hooks/useTeamCandidateData.ts";
import {versionGroupToSlug} from "../../../../../global/labels.ts";
import {PokemonTeamMember} from "../../../../../global/types.ts";
import {VersionGroup} from "../../../../../global/enums.ts";
import {getGenRules} from "../../../genRules.ts";
import {VersionToGen} from "../../constants.ts";
import {EditorHeader} from "./styles.ts";
import SetEditorSkeleton from "./SetEditorSkeleton.tsx";
import DetailsColumn from "./columns/DetailsColumn.tsx";
import MovesColumn from "./columns/MovesColumn.tsx";
import StatsColumn from "./columns/StatsColumn.tsx";

interface SetEditorProps {
    member: PokemonTeamMember;
    slot: number;
    editMode: boolean;
    versionGroup: VersionGroup | null;
    onClose: () => void;
}

const SetEditor: FC<SetEditorProps> = ({member, slot, editMode, versionGroup, onClose}) => {
    const versionSlug = versionGroup ? versionGroupToSlug(versionGroup) : 'national';
    const {data: candidate, isPending, error} = useTeamCandidateDetails(versionSlug, member.id);

    if (isPending) return <SetEditorSkeleton/>;
    if (error) throw error;

    const rules = getGenRules(versionGroup);
    // National/home teams aren't pinned to one game's item pool, so they get
    // the most current gen's items, matching getGenRules' own null handling.
    const itemGen = versionGroup ? VersionToGen[versionGroup] : 9;

    return (
        <Paper sx={{px: 4, py: 3}}>
            <Box sx={{marginBottom: 1}}>
                <Button startIcon={<ArrowBackIcon/>} onClick={onClose}>
                    Back to Pokémon Select
                </Button>
            </Box>
            <EditorHeader type1={member.teraType ?? member.type1} type2={member.teraType ?? member.type2}>
                <PokemonImg id={member.id} shiny={member.shiny} female={member.gender === 'female'}/>
                <Typography variant="h3" sx={{color: '#fff'}}>
                    {member.nickname ?? member.name}
                </Typography>
                <Box sx={{display: 'flex', gap: 1, flexGrow: 1}}>
                    <TypeIcon type={member.type1} size={32} variant="circular"/>
                    {member.type2 && <TypeIcon type={member.type2} size={32} variant="circular"/>}
                    {member.teraType && <TypeIcon type={member.teraType} size={32} variant="circular"/>}
                </Box>
                <IconButton onClick={onClose} aria-label="Close set editor" sx={{color: '#fff'}}>
                    <CloseIcon/>
                </IconButton>
            </EditorHeader>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <DetailsColumn slot={slot} member={member} candidate={candidate} rules={rules} editMode={editMode} itemGen={itemGen}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <MovesColumn slot={slot} member={member} candidate={candidate} editMode={editMode}/>
                </Grid>
                <Grid size={{xs: 12}}>
                    <StatsColumn slot={slot} member={member} candidate={candidate} rules={rules} editMode={editMode}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SetEditor;
