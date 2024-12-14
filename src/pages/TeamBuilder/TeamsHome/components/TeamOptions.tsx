import {FC, useState, MouseEvent} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/OpenInNew';
import {useNavigate} from "react-router-dom";
import {COLORS} from "../../../../theme/styles/colors.ts";
import {Menu, MenuItem, IconButton} from "@mui/material";
import DeleteDialog from "../../components/DeleteDialog.tsx";

interface ITeamOptionsProps {
    id: number;
}

const TeamOptions: FC<ITeamOptionsProps> = ({id}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            width: '10ch',
                        },
                    },
                }}
            >
                <MenuItem onClick={() => navigate(`/team-builder/${id}`)}>
                    <EditIcon sx={{marginRight: 1}}/>
                    Edit
                </MenuItem>
                <MenuItem>
                    <ViewIcon sx={{marginRight: 1}}/>
                    View
                </MenuItem>
                <DeleteDialog
                    id={id}
                    trigger={
                        <MenuItem sx={{color: COLORS.RED}}>
                            <DeleteIcon sx={{marginRight: 1}}/>
                            Delete
                        </MenuItem>
                    }
                />
            </Menu>
        </>
    );
}

export default TeamOptions