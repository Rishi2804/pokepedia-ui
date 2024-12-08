import {Box, Button} from "@mui/material";
import {FC} from "react";

interface ActionButtonsProps {
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    advancedOptions: boolean;
    setAdvancedOptions: (mode: boolean) => void;
    showAnalysis: boolean;
    setShowAnalysis: (mode: boolean) => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({editMode, setEditMode, advancedOptions, setAdvancedOptions, showAnalysis, setShowAnalysis}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>
            <Box sx={{display: 'flex', gap: 2}}>
                <Button variant="contained" onClick={() => setAdvancedOptions(!advancedOptions)}>{ (advancedOptions ? "Disable" : "Enable") + " Advanced Options"}</Button>
                <Button variant="contained" onClick={() => setShowAnalysis(!showAnalysis)}>{(showAnalysis ? "Hide" : "Show") + " Analysis"}</Button>
            </Box>
            <Button variant="contained" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Save Team" : "Edit Team"}
            </Button>
        </Box>
    );
};

export default ActionButtons;