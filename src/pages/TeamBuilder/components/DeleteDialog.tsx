import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {FC, ReactNode, useState} from "react";
import {useTeamStore} from "../../../store/teamStore.ts";

interface IDeleteDialogProps {
    id: number;
    trigger: ReactNode;
    onDelete?: () => void;
}

const DeleteDialog: FC<IDeleteDialogProps> = ({id, trigger, onDelete}) => {
    const [open, setOpen] = useState<boolean>(false)
    const { deleteTeam } = useTeamStore()

    const handleDelete = () => {
        deleteTeam(id)
        onDelete?.()
    }

    return (
        <>
            <Box onClick={() => setOpen(true)}>
                {trigger}
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{sx: {width: '40ch'}}}>
                <DialogTitle variant="h3">{"Deleting Team"}</DialogTitle>
                <DialogContent>
                    {"You are about to be deleting this team, are you sure you want to proceed? This action cannot be reversed."}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteDialog;