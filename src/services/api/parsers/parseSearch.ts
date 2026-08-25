import {SearchEntityType, SearchGroup, SearchHit, SearchResults} from "../../../global/types.ts";
import {ApiParseError} from "../parse.ts";

interface WireSearchHit {
    type: string;
    id: number;
    name: string;
    gen: number;
    meta?: Record<string, unknown>;
}

interface WireSearchGroup {
    type: string;
    total: number;
    hits: WireSearchHit[];
}

interface WireSearchResults {
    query: string;
    degraded: boolean;
    groups: WireSearchGroup[];
}

const ENTITY_TYPES: readonly string[] = ["pokemon", "move", "ability"];

// Not asEnum: the wire value is already lowercase, which doesn't fit
// asEnum's key-equals-value assumption — see the SearchEntityType comment
// in global/types.ts.
function asEntityType(v: string, field: string): SearchEntityType {
    if (ENTITY_TYPES.includes(v)) return v as SearchEntityType;
    throw new ApiParseError(field, v);
}

function parseSearchHit(h: WireSearchHit): SearchHit {
    return {
        type: asEntityType(h.type, 'hit.type'),
        id: h.id,
        name: h.name,
        gen: h.gen,
        meta: h.meta,
    };
}

function parseSearchGroup(g: WireSearchGroup): SearchGroup {
    return {
        type: asEntityType(g.type, 'group.type'),
        total: g.total,
        hits: g.hits.map(parseSearchHit),
    };
}

// GET /api/v1/search — grouped results page.
export function parseSearchResults(json: unknown): SearchResults {
    const wire = json as WireSearchResults;
    return {
        query: wire.query,
        degraded: wire.degraded,
        groups: wire.groups.map(parseSearchGroup),
    };
}

// GET /api/v1/search/suggest — flat, name-ranked list for the typeahead.
export function parseSearchSuggest(json: unknown): SearchHit[] {
    return (json as WireSearchHit[]).map(parseSearchHit);
}
