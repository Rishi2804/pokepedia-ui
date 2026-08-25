import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {Alert, Box, Grid2 as Grid, Typography} from "@mui/material";
import MetaData from "../../components/MetaData/MetaData.tsx";
import PokemonList from "../../components/PokemonList/PokemonList.tsx";
import MoveList from "../../components/MoveList/MoveList.tsx";
import {AbilityContainer, AbilityText} from "../Abilities/AbilityHome/styles.ts";
import {useSearchResults} from "../../services/api/hooks/useSearch.ts";
import {asEnum, asNullableEnum} from "../../services/api/parse.ts";
import {MoveClass, PokemonType} from "../../global/enums.ts";
import {MoveSnapshot, PokemonSnapshot, SearchEntityType, SearchHit} from "../../global/types.ts";
import {searchHitPath} from "../../global/utils.ts";
import SearchSkeleton from "./SearchSkeleton.tsx";
import {GroupSection, HitMeta, HitRow, ShowAllLink} from "./styles.ts";

const GROUP_LABELS: Record<SearchEntityType, string> = {
    pokemon: "Pokémon",
    move: "Moves",
    ability: "Abilities",
};

// Degraded (Postgres fallback) hits carry no meta at all, so they can't
// build a full snapshot — those groups fall back to a plain text row below.
function toPokemonSnapshot(hit: SearchHit): PokemonSnapshot | null {
    if (!hit.meta) return null;
    return {
        dexNumber: Number(hit.meta.dex_number),
        speciesId: Number(hit.meta.species_id),
        pokemonId: hit.id,
        name: hit.name,
        type1: asEnum(PokemonType, hit.meta.type1, "meta.type1"),
        type2: asNullableEnum(PokemonType, hit.meta.type2 ?? null, "meta.type2"),
    };
}

function toMoveSnapshot(hit: SearchHit): MoveSnapshot | null {
    if (!hit.meta) return null;
    return {
        id: hit.id,
        name: hit.name,
        type: asEnum(PokemonType, hit.meta.move_type, "meta.move_type"),
        moveClass: asEnum(MoveClass, hit.meta.move_class, "meta.move_class"),
        power: typeof hit.meta.power === "number" ? hit.meta.power : null,
        accuracy: typeof hit.meta.accuracy === "number" ? hit.meta.accuracy : null,
        pp: typeof hit.meta.pp === "number" ? hit.meta.pp : null,
        gen: hit.gen,
    };
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

    const showAll = (group: { hits: SearchHit[]; total: number }) =>
        group.hits.length < group.total && size < EXPANDED_SIZE && (
            <ShowAllLink onClick={() => setSize(EXPANDED_SIZE)}>
                Show all {group.total}
            </ShowAllLink>
        );

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

            {data.groups.map(group => {
                if (group.type === "pokemon" && !data.degraded) {
                    const pokemon = group.hits.map(toPokemonSnapshot).filter((p): p is PokemonSnapshot => p !== null);
                    return (
                        <GroupSection key={group.type}>
                            <PokemonList data={pokemon} header={`${GROUP_LABELS.pokemon} (${group.total})`}/>
                            {showAll(group)}
                        </GroupSection>
                    );
                }

                if (group.type === "move" && !data.degraded) {
                    const moves = group.hits.map(toMoveSnapshot).filter((m): m is MoveSnapshot => m !== null);
                    return (
                        <GroupSection key={group.type}>
                            <MoveList moves={moves} title={`${GROUP_LABELS.move} (${group.total})`}/>
                            {showAll(group)}
                        </GroupSection>
                    );
                }

                if (group.type === "ability" && !data.degraded) {
                    return (
                        <GroupSection key={group.type}>
                            <Typography variant="h2" sx={{marginBottom: 2}}>
                                {GROUP_LABELS.ability} ({group.total})
                            </Typography>
                            <Grid container spacing={2} sx={{marginBottom: 3}}>
                                {group.hits.map(hit => (
                                    <Grid size={3} key={hit.id}>
                                        <AbilityContainer>
                                            <AbilityText onClick={() => navigate(searchHitPath(hit))}>
                                                {hit.name}
                                            </AbilityText>
                                        </AbilityContainer>
                                    </Grid>
                                ))}
                            </Grid>
                            {showAll(group)}
                        </GroupSection>
                    );
                }

                // Degraded fallback: no meta to build a real card from.
                return (
                    <GroupSection key={group.type}>
                        <Typography variant="h2" sx={{paddingBottom: 2}}>
                            {GROUP_LABELS[group.type]} ({group.total})
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                            {group.hits.map(hit => (
                                <HitRow key={hit.id} onClick={() => navigate(searchHitPath(hit))}>
                                    <Typography variant="h5">{hit.name}</Typography>
                                    <HitMeta variant="body2">Gen {hit.gen}</HitMeta>
                                </HitRow>
                            ))}
                        </Box>
                        {showAll(group)}
                    </GroupSection>
                );
            })}
        </>
    );
};

export default Search;
