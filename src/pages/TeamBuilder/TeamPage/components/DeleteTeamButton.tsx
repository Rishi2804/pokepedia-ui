import {Button, darken, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from "@mui/system";
import {COLORS} from "../../../../theme/styles/colors.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTeamStore} from "../../../../store/teamStore.ts";

const DeleteTeamButton = ({id}: {id: number}) => {
    const [open, setOpen] = useState<boolean>(false)
    const { deleteTeam } = useTeamStore()
    const navigate = useNavigate()

    const StyledButton = styled(IconButton)(({ theme }) => ({
        backgroundColor: theme.palette.error.main,
        color: COLORS.WHITE,
        '&:hover': {
            backgroundColor: darken(theme.palette.error.main, 0.25),
        }
    }))

    const handleDelete = () => {
        setOpen(false)
        deleteTeam(id)
        navigate('/team-builder')
    }


    return (
        <>
            <StyledButton onClick={() => setOpen(true)}>
                <DeleteIcon />
            </StyledButton>
            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{sx: {width: '80vh'}}}>
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

export default DeleteTeamButton;