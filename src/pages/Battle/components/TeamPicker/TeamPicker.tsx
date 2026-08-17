import {Box, Button, MenuItem, Select, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {FC, useState} from "react";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {VersionGroup} from "../../../../global/enums.ts";
import {versionGroupLabel, versionGroupToSlug} from "../../../../global/labels.ts";
import {PokemonTeam, PokemonTeamMember} from "../../../../global/types.ts";
import {teamCandidateQuery} from "../../../../services/api/hooks/useTeamCandidateData.ts";
import {useTeamCandidatesDetails} from "../../../../services/api/hooks/useTeamCandidatesData.ts";
import {useTeamStore} from "../../../../store/teamStore.ts";
import {getGenRules} from "../../../TeamBuilder/genRules.ts";
import {importSet, parseSpeciesName, resolveSpecies, splitTeamText} from "../../../TeamBuilder/utils/showdownText.ts";
import {MemberRow, MemberThumb, TeamOption} from "./styles.ts";

export interface TeamPickerSelection {
    pokemon: PokemonTeamMember[];
    versionGroup: VersionGroup | null;
}

interface TeamPickerProps {
    onSelect: (selection: TeamPickerSelection) => void;
}

// Picks a roster to battle with - either an existing saved team (unedited,
// straight from the team builder) or a one-off Showdown-format paste that's
// never written to the team store. Either way the result is just handed to
// the parent; this component owns no battle-flow state of its own.
const TeamPicker: FC<TeamPickerProps> = ({onSelect}) => {
    const [tab, setTab] = useState<'saved' | 'paste'>('saved');
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const {teams} = useTeamStore();

    const handleSelectSaved = (team: PokemonTeam) => {
        setSelectedTeamId(team.id);
        onSelect({pokemon: team.pokemon, versionGroup: team.versionGroup});
    };

    const handleImported = (selection: TeamPickerSelection) => {
        setSelectedTeamId(null);
        onSelect(selection);
    };

    return (
        <Box>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{marginBottom: 2}}>
                <Tab value="saved" label="My Teams"/>
                <Tab value="paste" label="Paste Team"/>
            </Tabs>
            {tab === 'saved' && (
                teams.length === 0 ? (
                    <Typography color="text.secondary">
                        You haven't built any teams yet — head to Team Builder first, or paste a Showdown team instead.
                    </Typography>
                ) : (
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        {teams.map(team => (
                            <TeamOption key={team.id} selected={team.id === selectedTeamId} onClick={() => handleSelectSaved(team)}>
                                <Typography variant="h5">{team.name}</Typography>
                                <MemberRow>
                                    {team.pokemon.map((mon, i) => (
                                        <MemberThumb key={i}>
                                            <PokemonImg id={mon.id} shiny={mon.shiny} female={mon.gender === 'female'}/>
                                        </MemberThumb>
                                    ))}
                                </MemberRow>
                            </TeamOption>
                        ))}
                    </Box>
                )
            )}
            {tab === 'paste' && <PasteTeamTab onImported={handleImported}/>}
        </Box>
    );
};

const PasteTeamTab: FC<{ onImported: (selection: TeamPickerSelection) => void }> = ({onImported}) => {
    const [versionGroup, setVersionGroup] = useState<VersionGroup | null>(null);
    const [text, setText] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);
    const versionSlug = versionGroup ? versionGroupToSlug(versionGroup) : 'national';
    const {data} = useTeamCandidatesDetails(versionSlug);
    const queryClient = useQueryClient();

    const handleImport = async () => {
        if (!data) return;
        setImporting(true);

        const allCandidates = data.flatMap(group => group.pokemon);
        const rules = getGenRules(versionGroup);
        const blocks = splitTeamText(text).slice(0, 6);
        const newErrors: string[] = [];
        const members: PokemonTeamMember[] = [];

        for (const block of blocks) {
            const speciesName = parseSpeciesName(block);
            const resolved = resolveSpecies(speciesName, allCandidates);
            if (!resolved) {
                newErrors.push(`"${speciesName}" isn't available in this version group.`);
                continue;
            }
            try {
                const detail = await queryClient.fetchQuery(teamCandidateQuery(versionSlug, resolved.id));
                const {member, errors: setErrors} = importSet(block, detail, versionGroup, rules);
                newErrors.push(...setErrors);
                if (member) members.push(member);
            } catch {
                newErrors.push(`Couldn't load data for ${resolved.name}.`);
            }
        }

        setErrors(newErrors);
        setImporting(false);
        if (members.length) onImported({pokemon: members, versionGroup});
    };

    return (
        <Box>
            <Select
                value={versionGroup ?? 'national'}
                onChange={e => setVersionGroup(e.target.value === 'national' ? null : e.target.value as VersionGroup)}
                sx={{marginBottom: 2, minWidth: 240}}
            >
                <MenuItem value="national">Home</MenuItem>
                {Object.values(VersionGroup).slice().reverse().map(group => (
                    <MenuItem key={group} value={group}>{versionGroupLabel[group]}</MenuItem>
                ))}
            </Select>
            {errors.length > 0 && (
                <Box sx={{color: 'error.main', marginBottom: 1, whiteSpace: 'pre-line'}}>
                    {errors.join('\n')}
                </Box>
            )}
            <TextField
                fullWidth
                multiline
                minRows={8}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste a Showdown-format team here…"
                slotProps={{htmlInput: {style: {fontFamily: 'monospace', fontSize: 13}}}}
                sx={{marginBottom: 1}}
            />
            <Button variant="contained" onClick={handleImport} disabled={!data || importing || !text.trim()}>
                Import Team
            </Button>
        </Box>
    );
};

export default TeamPicker;
