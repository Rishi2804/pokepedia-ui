import {useMemo, useState} from "react";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import {useItemsDetails} from "../../../services/api/hooks/useItemsData.ts";
import {titleCase} from "../../../services/api/parsers/parseItems.ts";
import {ItemGroup, ItemSnapshot} from "../../../global/types.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Filters from "../../../components/Filters/Filters.tsx";
import ItemSprite from "../../../components/ItemSprite/ItemSprite.tsx";
import ItemHomeSkeleton from "./ItemHomeSkeleton.tsx";
import {ItemContainer, ItemLink, ItemText} from "./styles.ts";

interface CategorySection {
    category: string;
    label: string;
    items: ItemSnapshot[];
}

// A pocket like "Other Items" holds over a thousand entries, so each pocket is
// split into its PokeAPI categories (Mega Stones, Plates, Evolution Items, ...)
// in first-seen order, with items alphabetical inside each.
function sectionsFor(group: ItemGroup, searchTerm: string): CategorySection[] {
    const term = searchTerm.trim().toLowerCase();
    const byCategory = new Map<string, ItemSnapshot[]>();
    for (const item of group.items) {
        // Plain substring match: the search box is free text, and building a
        // RegExp from it throws on input like "(".
        if (term && !item.name.toLowerCase().includes(term)) continue;
        const bucket = byCategory.get(item.category);
        if (bucket) bucket.push(item);
        else byCategory.set(item.category, [item]);
    }
    return [...byCategory.entries()].map(([category, items]) => ({
        category,
        label: titleCase(category),
        items: [...items].sort((a, b) => a.name.localeCompare(b.name)),
    }));
}

const ItemHome = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const {data, isPending, error} = useItemsDetails();

    const pockets = useMemo(
        () => (data ?? [])
            .map(group => ({group, sections: sectionsFor(group, searchTerm)}))
            .filter(({sections}) => sections.length > 0),
        [data, searchTerm],
    );

    if (isPending) {
        return <ItemHomeSkeleton/>;
    }

    if (error) {
        throw error;
    }

    return (
        <>
            <MetaData pageTitle={`Items | PokePedia`}/>
            <Typography variant="h1" sx={{paddingY: 5, textAlign: "center"}}>Items</Typography>
            <QuickScroll items={pockets.map(({group}) => group.label)} heading={"Jump to:"}/>
            <Filters searchBoxText={"Search Items"} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {pockets.length === 0 && (
                <Typography sx={{textAlign: "center", paddingY: 4}}>No items match "{searchTerm}".</Typography>
            )}
            {
                pockets.map(({group, sections}) => (
                    <Box key={group.pocket} sx={{width: '100%'}} id={group.label}>
                        <Typography variant="h2" sx={{marginBottom: 2}}>{group.label}</Typography>
                        {
                            sections.map(section => (
                                <Box key={section.category} sx={{marginBottom: 3}}>
                                    {/* Pockets with a single category would just repeat their title. */}
                                    {sections.length > 1 && (
                                        <Typography variant="h5" sx={{marginBottom: 1.5}}>{section.label}</Typography>
                                    )}
                                    <Grid container spacing={2}>
                                        {
                                            section.items.map(item => (
                                                <Grid key={item.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                                                    <ItemLink to={`/item/${item.slug}`}>
                                                        <ItemContainer>
                                                            <ItemSprite sprite={item.sprite} name={item.name}/>
                                                            <ItemText className="item-name">{item.name}</ItemText>
                                                        </ItemContainer>
                                                    </ItemLink>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Box>
                            ))
                        }
                    </Box>
                ))
            }
        </>
    );
};

export default ItemHome;
