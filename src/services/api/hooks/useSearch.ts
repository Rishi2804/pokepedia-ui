import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseSearchResults, parseSearchSuggest} from "../parsers/parseSearch.ts";

export const useSearchResults = (query: string, size?: number) => {
    const params = new URLSearchParams({q: query});
    if (size) params.set('size', String(size));

    return useQuery({
        queryKey: ['search', query, size],
        queryFn: () => getJson(`${ENDPOINTS.SEARCH}?${params}`, parseSearchResults),
        enabled: !!query,
    });
};

// keepPreviousData so the dropdown doesn't flash empty between keystrokes.
export const useSearchSuggest = (query: string) => {
    const params = new URLSearchParams({q: query});

    return useQuery({
        queryKey: ['search-suggest', query],
        queryFn: () => getJson(`${ENDPOINTS.SEARCH}/suggest?${params}`, parseSearchSuggest),
        enabled: !!query,
        placeholderData: keepPreviousData,
    });
};
