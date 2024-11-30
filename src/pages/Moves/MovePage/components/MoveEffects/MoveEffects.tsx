import {Box, Divider, Grid2 as Grid, Stack, Typography} from "@mui/material";
import {FC} from "react";
import {Game, VersionGroup} from "../../../../../global/enums.ts";
import {gameToColorMap} from "../../../../Pokemon/PokedexEntries/constants.ts";

interface IMoveEffectsProps {
    effect: string;
    pastMoveValues: {
        movePower: number | null;
        moveAccuracy: number | null;
        movePP: number | null;
        versionGroups: VersionGroup[];
    }[];
    currPower: number | null;
    currAccuracy: number | null;
    currPP: number | null;
}

const MoveEffects: FC<IMoveEffectsProps> = ({effect, pastMoveValues, currPower, currAccuracy, currPP}) => {
    const filteredHistory = pastMoveValues.filter(values =>
        (!(currPower === values.movePower && currAccuracy === values.moveAccuracy && currPP === values.movePP)))

    return (
        <Grid size={{xs: 12, sm: 8}}>
            <Typography variant="h2" sx={{marginBottom: 1}}>Effects</Typography>
            <Typography sx={{marginBottom: 2}}>{effect ?? "No effect currently listed"}</Typography>
            {!!filteredHistory.length && <>
                <Typography variant="h3">History</Typography>
                <Typography variant="subtitle1">Past values of move</Typography>
                <Stack spacing={1} divider={<Divider flexItem/>}>
                    <Grid container>
                        <Grid size={6}>Version Groups</Grid>
                        <Grid size={2}>Power</Grid>
                        <Grid size={2}>Accuracy</Grid>
                        <Grid size={2}>PP</Grid>
                    </Grid>
                    {
                        filteredHistory.map((pastVals, index) => {
                            const gamesList: Game[][] = pastVals.versionGroups
                                .map(group =>
                                    group.split("/").map(game => game as Game))
                            return (
                                <Grid container key={index}>
                                    <Grid size={6} sx={{display: 'flex', flexWrap: 'wrap'}}>
                                        {
                                            gamesList.map((group, index) => (
                                                <Box key={index} sx={{display: 'flex'}}>
                                                    {
                                                        group.map((game, index) => (
                                                            <Box key={index} sx={{display: 'flex'}}>
                                                                <Typography
                                                                    color={gameToColorMap[game]}>{game}</Typography>
                                                                <Typography
                                                                    sx={{display: index < group.length - 1 ? 'block' : "none"}}>/</Typography>
                                                            </Box>
                                                        ))
                                                    }
                                                    {index < gamesList.length - 1 && (
                                                        <Typography sx={{whiteSpace: 'pre-wrap'}}>{", "}</Typography>
                                                    )}
                                                </Box>
                                            ))
                                        }
                                    </Grid>
                                    <Grid size={2} sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>{pastVals.movePower ?? "--"}</Grid>
                                    <Grid size={2} sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>{pastVals.moveAccuracy ?? "--"}</Grid>
                                    <Grid size={2}
                                          sx={{display: 'flex', alignItems: 'center'}}>{pastVals.movePP ?? "--"}</Grid>
                                </Grid>
                            )
                        })
                    }
                </Stack>
            </>}
        </Grid>
    );
};

export default MoveEffects;