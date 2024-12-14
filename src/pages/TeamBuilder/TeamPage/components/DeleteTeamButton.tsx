import {darken, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from "@mui/system";
import {COLORS} from "../../../../theme/styles/colors.ts";
import {useNavigate} from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog.tsx";

const DeleteTeamButton = ({id}: {id: number}) => {
    const navigate = useNavigate()

    const StyledButton = styled(IconButton)(({ theme }) => ({
        backgroundColor: theme.palette.error.main,
        color: COLORS.WHITE,
        '&:hover': {
            backgroundColor: darken(theme.palette.error.main, 0.25),
        }
    }))

    return (
        <DeleteDialog
            id={id}
            trigger={
                <StyledButton>
                    <DeleteIcon />
                </StyledButton>
            }
            onDelete={() => navigate('/team-builder')}
        />
    );
};

export default DeleteTeamButton;