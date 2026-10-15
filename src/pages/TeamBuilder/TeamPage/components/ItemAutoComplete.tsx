import {FC} from "react";
import {Autocomplete, Box, TextField, Typography} from "@mui/material";
import {HoldableItem} from "../../../../global/types.ts";
import ItemImage from "../../../../components/ItemImage/ItemImage.tsx";

interface ItemAutoCompleteProps {
    // Showdown id of the held item (PokemonTeamMember.item), or null.
    value: string | null;
    // The items this team's format allows; undefined while still loading.
    items: HoldableItem[] | undefined;
    onChange: (showdownId: string | null) => void;
    disabled: boolean;
}

// Held-item picker. Only items the battle server accepts for the team's
// format are offered (GET /team-building/items/{format}), so a pick can't
// fail validation later. An item already on the member that isn't in the list
// (saved before this list existed, or forced onto a Mega) stays visible and
// is flagged instead of being silently dropped.
const ItemAutoComplete: FC<ItemAutoCompleteProps> = ({value, items, onChange, disabled}) => {
    const loaded = items !== undefined;
    const match = value ? items?.find(item => item.showdownId === value) : undefined;
    const unavailable = !!value && loaded && !match;
    const shown: HoldableItem | null = match
        ?? (value ? {showdownId: value, name: value, image: "", shortEffect: ""} : null);

    return (
        <Autocomplete
            options={items ?? []}
            value={shown}
            loading={!loaded}
            disabled={disabled}
            autoHighlight
            onChange={(_, item) => onChange(item?.showdownId ?? null)}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, selected) => option.showdownId === selected.showdownId}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Held Item"
                    error={unavailable}
                    helperText={unavailable ? "Not legal in this format. Pick another item or clear it." : undefined}
                />
            )}
            renderOption={(props, option) => {
                const {key, ...optionProps} = props;
                return (
                    <Box component="li" key={key} {...optionProps} sx={{display: "flex", gap: 1.5, alignItems: "center"}}>
                        <ItemImage image={option.image} name={option.name} size={32}/>
                        <Box sx={{minWidth: 0}}>
                            <Typography>{option.name}</Typography>
                            {option.shortEffect && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    title={option.shortEffect}
                                    sx={{display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                                >
                                    {option.shortEffect}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                );
            }}
        />
    );
};

export default ItemAutoComplete;
