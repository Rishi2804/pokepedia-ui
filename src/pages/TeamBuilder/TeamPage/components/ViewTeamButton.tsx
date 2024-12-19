import {darken, IconButton} from "@mui/material";
import ViewIcon from '@mui/icons-material/OpenInNew';
import {styled} from "@mui/system";
import {COLORS} from "../../../../theme/styles/colors.ts";
import ViewDialog from "../../components/ViewDialog.tsx";
import {PokemonTeam} from "../../../../global/types.ts";

const ViewTeamButton = ({id, currentTeam}: {id: number, currentTeam: PokemonTeam}) => {

    const StyledButton = styled(IconButton)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: COLORS.WHITE,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.25),
        }
    }))

    return (
        <ViewDialog
            id={id}
            trigger={
                <StyledButton>
                    <ViewIcon />
                </StyledButton>
            }
            teamToView={currentTeam}
        />
    );
};

export default ViewTeamButton;