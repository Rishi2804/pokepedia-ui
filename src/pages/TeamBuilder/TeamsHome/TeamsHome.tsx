import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Typography} from "@mui/material";
import VersionGroupDialog from "./components/VersionGroupDialog.tsx";

const TeamsHome = () => {
    return (
        <>
            <MetaData pageTitle={`Team Builder | PokePedia`} />
            <Typography variant="h1" sx={{padding: 3, textAlign: "center"}}>Team Builder</Typography>
            <VersionGroupDialog />
            <Typography variant="h2" sx={{marginY: 3}}>My Teams</Typography>
        </>
    );
};

export default TeamsHome;