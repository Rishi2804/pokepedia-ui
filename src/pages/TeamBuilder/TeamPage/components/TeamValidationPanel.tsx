import {FC} from "react";
import {Alert, AlertTitle, Typography} from "@mui/material";
import {VersionGroup} from "../../../../global/enums.ts";
import type {PokemonTeamMember, TeamCandidateSummary} from "../../../../global/types.ts";
import {useTeamValidation} from "../../../../services/battle/useTeamValidation.ts";

interface TeamValidationPanelProps {
    members: PokemonTeamMember[];
    versionGroup: VersionGroup | null;
    candidates: TeamCandidateSummary[];
}

// What the battle server would say about this team if a room were created with
// it right now. The messages are Showdown's own, so a fresh member with no EVs
// reports that too, exactly as a battle would.
const TeamValidationPanel: FC<TeamValidationPanelProps> = ({members, versionGroup, candidates}) => {
    const {data, isError} = useTeamValidation(members, versionGroup, candidates);

    if (members.length === 0) return null;

    if (isError && !data) {
        // The battle server being down shouldn't read like a team problem.
        return <Typography variant="caption" color="text.secondary">Battle validation is unavailable right now.</Typography>;
    }

    if (!data) return null;

    if (data.valid) {
        return <Alert severity="success" variant="outlined">This team passes validation and is ready to battle.</Alert>;
    }

    return (
        <Alert severity="warning">
            <AlertTitle>{data.problems.length} {data.problems.length === 1 ? 'problem' : 'problems'} with this team</AlertTitle>
            <ul style={{margin: 0, paddingLeft: 20}}>
                {data.problems.map((problem, i) => <li key={i}>{problem}</li>)}
            </ul>
        </Alert>
    );
};

export default TeamValidationPanel;
