import {FC} from "react";
import {Typography} from "@mui/material";
import MoveAutoComplete from "../../MoveAutoComplete.tsx";
import {ColumnPaper} from "../styles.ts";
import {PokemonTeamMember, TeamCandidate, TeamMove} from "../../../../../../global/types.ts";
import {PokemonType} from "../../../../../../global/enums.ts";
import {GenRules} from "../../../../genRules.ts";
import {HIDDEN_POWER_MOVE_ID, hiddenPowerTypeFor} from "../../../../utils/stats.ts";
import {useTeamStore} from "../../../../../../store/teamStore.ts";

interface MovesColumnProps {
    slot: number;
    member: PokemonTeamMember;
    candidate: TeamCandidate;
    rules: GenRules;
    editMode: boolean;
}

const MovesColumn: FC<MovesColumnProps> = ({slot, member, candidate, rules, editMode}) => {
    const {editPokemon} = useTeamStore();

    const handleMoveChange = (moveIndex: number, move: TeamMove | null) => {
        if (move?.id === 851) move.type = member.teraType ?? PokemonType.NORMAL;
        if (move?.id === HIDDEN_POWER_MOVE_ID) move.type = hiddenPowerTypeFor(member.ivs, rules.ivModel);
        const updated = [...member.moves];
        updated[moveIndex] = move;
        const nonNull = updated.filter(m => m !== null);
        const nulls = updated.filter(m => m === null);
        editPokemon(slot, {...member, moves: [...nonNull, ...nulls]});
    };

    return (
        <ColumnPaper elevation={2}>
            <Typography variant="h4" sx={{marginBottom: 2}}>Moves</Typography>
            {[...Array(4)].map((_, moveIndex) => (
                <MoveAutoComplete
                    key={moveIndex}
                    editMode={editMode}
                    movesList={candidate.moves}
                    label={`Move ${moveIndex + 1}`}
                    currentMove={member.moves[moveIndex]}
                    updateMove={(move: TeamMove | null) => handleMoveChange(moveIndex, move)}
                />
            ))}
        </ColumnPaper>
    );
};

export default MovesColumn;
