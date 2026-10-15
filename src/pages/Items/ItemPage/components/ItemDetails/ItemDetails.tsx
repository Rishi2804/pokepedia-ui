import {FC} from "react";
import {Box, Chip, Grid2 as Grid, Paper, Stack, Typography} from "@mui/material";
import {ItemDetails as ItemDetailsData} from "../../../../../global/types.ts";
import {titleCase} from "../../../../../global/utils.ts";
import {formatLabel} from "../../formatLabels.ts";

interface IItemDetailsProps {
    item: ItemDetailsData;
}

const Fact: FC<{label: string; value: string}> = ({label, value}) => (
    <Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography>{value}</Typography>
    </Box>
);

const ItemDetails: FC<IItemDetailsProps> = ({item}) => {
    return (
        <Grid size={12}>
            <Typography variant="h2" sx={{marginBottom: 2}} id={"Details"}>Details</Typography>
            <Paper sx={{padding: 2}}>
                <Stack spacing={2}>
                    <Box sx={{display: "grid", gap: 2, gridTemplateColumns: {xs: "1fr 1fr", md: "repeat(3, 1fr)"}}}>
                        <Fact label="Category" value={titleCase(item.category)}/>
                        <Fact label="Introduced" value={item.gen ? `Generation ${item.gen}` : "Unknown"}/>
                        <Fact label="Buy price" value={item.cost > 0 ? `₽${item.cost.toLocaleString()}` : "Not sold"}/>
                    </Box>
                    {item.holdable && item.legalFormats.length > 0 && (
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{marginBottom: 1}}>
                                Can be held in the team builder and battles for
                            </Typography>
                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                {item.legalFormats.map(format => (
                                    <Chip key={format} size="small" label={formatLabel(format)}/>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {/* Fling only matters to a few niche strategies, so it is a footnote
                        rather than one of the headline facts, and absent when the item
                        can't be flung. */}
                    {item.flingPower != null && (
                        <Typography variant="caption" color="text.secondary">
                            Fling: {item.flingPower} power{item.flingEffect ? `, ${item.flingEffect}` : ""}
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Grid>
    );
};

export default ItemDetails;
