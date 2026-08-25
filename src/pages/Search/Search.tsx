import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {Alert, Box, Typography} from "@mui/material";
import MetaData from "../../components/MetaData/MetaData.tsx";
import {useSearchResults} from "../../services/api/hooks/useSearch.ts";
import {SearchEntityType, SearchHit} from "../../global/types.ts";
import {navName} from "../../global/utils.ts";
import SearchSkeleton from "./SearchSkeleton.tsx";
import {GroupSection, HitMeta, HitRow, ShowAllLink} from "./styles.ts";

const GROUP_LABELS: Record<SearchEntityType, string> = {
    pokemon: "Pokémon",
    move: "Moves",
    ability: "Abilities",
};

// meta shape varies by entity type and isn't typed beyond Record<string,
// unknown> — see the SearchHit comment in global/types.ts.
function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function describeHit(hit: SearchHit): string {
    const meta = hit.meta ?? {};
    switch (hit.type) {
        case "pokemon": {
            const types = [meta.type1, meta.type2]
                .filter((t): t is string => typeof t === "string")
                .map(capitalize)
                .join(" / ");
            const bst = typeof meta.bst === "number" ? `BST ${meta.bst}` : null;
            return [types, bst].filter(Boolean).join(" · ");
        }
        case "move": {
            const type = typeof meta.move_type === "string" ? capitalize(meta.move_type) : null;
            const moveClass = typeof meta.move_class === "string" ? capitalize(meta.move_class) : null;
            const power = typeof meta.power === "number" ? `${meta.power} power` : "-- power";
            return [type, moveClass, power].filter(Boolean).join(" · ");
        }
        case "ability":
            return `Gen ${hit.gen}`;
    }
}

// Pokemon navigate by numeric id (the backend resolves variant ids >=10000
// to their species internally); moves and abilities navigate by slug.
function hitPath(hit: SearchHit): string {
    switch (hit.type) {
        case "pokemon":
            return `/pokemon/${hit.id}`;
        case "move":
            return `/move/${navName(hit.name)}`;
        case "ability":
            return `/ability/${navName(hit.name)}`;
    }
}

const EXPANDED_SIZE = 50;
const DEFAULT_SIZE = 5;

const Search = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q")?.trim() ?? "";
    const [size, setSize] = useState(DEFAULT_SIZE);

    const {data, isPending, error} = useSearchResults(query, size);

    if (!query) {
        return (
            <>
                <MetaData pageTitle="Search | PokePedia"/>
                <Typography variant="h1" sx={{paddingY: 5, textAlign: "center"}}>Search</Typography>
                <Typography sx={{textAlign: "center"}}>Type something in the search bar to get started.</Typography>
            </>
        );
    }

    if (isPending) {
        return <SearchSkeleton/>;
    }

    if (error) {
        throw error;
    }

    const totalHits = data.groups.reduce((sum, g) => sum + g.total, 0);

    return (
        <>
            <MetaData pageTitle={`${query} | Search | PokePedia`}/>
            <Typography variant="h1" sx={{paddingTop: 5, textAlign: "center"}}>
                Results for &quot;{query}&quot;
            </Typography>
            <Typography sx={{textAlign: "center", paddingBottom: 3}} color="text.secondary">
                {totalHits} result{totalHits === 1 ? "" : "s"}
            </Typography>

            {data.degraded && (
                <Alert severity="warning" sx={{marginBottom: 3}}>
                    Showing limited results — full search is temporarily unavailable.
                </Alert>
            )}

            {data.groups.length === 0 && (
                <Typography sx={{textAlign: "center", paddingY: 5}}>
                    No results found for &quot;{query}&quot;.
                </Typography>
            )}

            {data.groups.map(group => (
                <GroupSection key={group.type}>
                    <Typography variant="h2" sx={{paddingBottom: 2}}>
                        {GROUP_LABELS[group.type]} ({group.total})
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                        {group.hits.map(hit => (
                            <HitRow key={hit.id} onClick={() => navigate(hitPath(hit))}>
                                <Typography variant="h5">{hit.name}</Typography>
                                <HitMeta variant="body2">{describeHit(hit)}</HitMeta>
                            </HitRow>
                        ))}
                    </Box>
                    {group.hits.length < group.total && size < EXPANDED_SIZE && (
                        <ShowAllLink onClick={() => setSize(EXPANDED_SIZE)}>
                            Show all {group.total}
                        </ShowAllLink>
                    )}
                </GroupSection>
            ))}
        </>
    );
};

export default Search;
