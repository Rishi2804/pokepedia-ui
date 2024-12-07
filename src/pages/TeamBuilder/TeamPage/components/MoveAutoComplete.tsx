import {useAutocomplete} from "@mui/material";
import {FC} from "react";
import {MoveInput, MoveListBox, MoveOption, StaticLabel} from "../styles.ts";
import {TeamMove} from "../../../../global/types.ts";

interface MoveAutoCompleteProps {
    movesList: TeamMove[];
    label: string
    currentMove: TeamMove | null;
    updateMove: (move: TeamMove | null) => void;
}

const MoveAutoComplete: FC<MoveAutoCompleteProps> = ({movesList, label, currentMove, updateMove}) => {

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
    } = useAutocomplete({
        id: 'moves',
        options: movesList,
        getOptionLabel: (option) => option.name,
        value: currentMove,
        onChange: (_, value) => updateMove(value)
    })

    return (
        <div>
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
                                <MoveOption type={option.type} key={key} {...optionProps}>{option.name}</MoveOption>
                            )
                        })}
                    </MoveListBox>
                ) : null
            }
        </div>
        );
        };

        export default MoveAutoComplete;