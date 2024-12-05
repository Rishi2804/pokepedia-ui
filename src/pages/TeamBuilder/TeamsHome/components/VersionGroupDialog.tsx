import {Box, Button, Dialog, Divider, Stack} from "@mui/material";
import {useState} from "react";
import {VersionGroup} from "../../../../global/enums.ts";
import {styled} from "@mui/system";


const VersionGroupDialog = () => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const VersionGroupText = styled(Box)(({ theme }) => ({
        padding: '15px',
        textAlign: 'center',
        '&:hover': {
            background: `${theme.palette.background.info}40`,
        },
        '&:active': {
            background: `${theme.palette.background.info}60`,  // Darken the background on click
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.2)',  // Create an inset shadow effect when clicked
        }
    }))

    return (
        <>
            <Button variant="contained" sx={{padding: 1.5}} onClick={handleClickOpen}>Create New Team</Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{sx: {width: '30rem'}}}>
                <Stack divider={<Divider flexItem /> }>
                    <VersionGroupText>Home</VersionGroupText>
                    {
                         Object.values(VersionGroup).reverse().map(group => (
                             <VersionGroupText>{group}</VersionGroupText>
                         ))
                    }
                </Stack>
            </Dialog>
        </>
    );
};

export default VersionGroupDialog;