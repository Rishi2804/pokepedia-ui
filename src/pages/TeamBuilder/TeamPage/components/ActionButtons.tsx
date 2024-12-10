import {Box, Button} from "@mui/material";
import {FC} from "react";
import {useTeamStore} from "../../../../store/teamStore.ts";
import {useNavigate} from "react-router-dom";

interface ActionButtonsProps {
    isCreateFlow?: boolean;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    advancedOptions: boolean;
    setAdvancedOptions: (mode: boolean) => void;
    showAnalysis: boolean;
    setShowAnalysis: (mode: boolean) => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({isCreateFlow, editMode, setEditMode, advancedOptions, setAdvancedOptions, showAnalysis, setShowAnalysis}) => {
    const nagivate = useNavigate()
    const { saveEditingTeam, validateCurrentTeam, currentTeam } = useTeamStore()

    const handleSave = () => {
        if (validateCurrentTeam()) {
            const id = currentTeam?.id
            setEditMode(!editMode)
            saveEditingTeam()
            if (isCreateFlow) {
                nagivate(`/team-builder/${id}`)
            }
        } else {
            throw new Error("Something went wrong")
        }
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>
            <Box sx={{display: 'flex', gap: 2}}>
                <Button variant="contained" onClick={() => setAdvancedOptions(!advancedOptions)}>{ (advancedOptions ? "Disable" : "Enable") + " Advanced Options"}</Button>
                <Button variant="contained" onClick={() => setShowAnalysis(!showAnalysis)}>{(showAnalysis ? "Hide" : "Show") + " Analysis"}</Button>
            </Box>
            <Button variant="contained" onClick={handleSave}>
                {editMode ? "Save Team" : "Edit Team"}
            </Button>
        </Box>
    );
};

export default ActionButtons;