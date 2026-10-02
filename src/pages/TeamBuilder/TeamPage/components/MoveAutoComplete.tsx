import {useAutocomplete} from "@mui/material";
import {FC} from "react";
import {
    MoveField,
    MoveInput,
    MoveListBox,
    MoveOption,
    MoveOptionDescription,
    MoveOptionHeader,
    MoveOptionName,
    MoveOptionStats,
    StaticLabel
} from "../styles.ts";
import {CandidateMove, TeamMove} from "../../../../global/types.ts";
import MoveClassIcon from "../../../../components/MoveClassIcon/MoveClassIcon.tsx";

interface MoveAutoCompleteProps {
    editMode: boolean;
    movesList: CandidateMove[];
    label: string
    currentMove: TeamMove | null;
    updateMove: (move: TeamMove | null) => void;
}

const statValue = (value: number | null) => value ?? "—";

// Legends: Z-A has a cooldown where every other game has PP.
const moveStatsLine = (move: CandidateMove) =>
    `Pow ${statValue(move.power)} · Acc ${statValue(move.accuracy)} · ${
        move.cooldown != null ? `CD ${move.cooldown}` : `PP ${statValue(move.pp)}`}`;

const MoveAutoComplete: FC<MoveAutoCompleteProps> = ({movesList, label, currentMove, updateMove, editMode}) => {

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
    } = useAutocomplete<TeamMove>({
        id: 'moves',
        options: movesList,
        getOptionLabel: (option) => option.name,
        // The chosen move is the stored TeamMove, not the picker's CandidateMove
        // instance, so match on id.
        isOptionEqualToValue: (option, selected) => option.id === selected.id,
        value: currentMove,
        onChange: (_, value) => updateMove(value),
        disabled: !editMode
    })

    return (
        <MoveField>
            <div {...getRootProps()}>
                <StaticLabel {...getInputLabelProps()}
                             sx={{fontSize: 14, textAlign: 'left', paddingLeft: 2}}>{label}</StaticLabel>
                <MoveInput {...getInputProps()} type={value?.type}/>
            </div>
            {
                movesList.length > 0 ? (
                    <MoveListBox {...getListboxProps()}>
                        {(groupedOptions as typeof movesList).map((option, index) => {
                            const {key, ...optionProps} = getOptionProps({option, index});
                            return (
                                <MoveOption type={option.type} key={key} {...optionProps}>
                                    <MoveOptionHeader>
                                        <MoveOptionName>{option.name}</MoveOptionName>
                                        <MoveOptionStats>
                                            <MoveClassIcon mClass={option.moveClass} size={18}/>
                                            {moveStatsLine(option)}
                                        </MoveOptionStats>
                                    </MoveOptionHeader>
                                    {option.description && (
                                        <MoveOptionDescription title={option.description}>
                                            {option.description}
                                        </MoveOptionDescription>
                                    )}
                                </MoveOption>
                            )
                        })}
                    </MoveListBox>
                ) : null
            }
        </MoveField>
        );
        };

        export default MoveAutoComplete;