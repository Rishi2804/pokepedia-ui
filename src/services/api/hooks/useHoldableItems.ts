import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseHoldableItems} from "../parsers/parseHoldableItems.ts";
import type {BattleFormatKey} from "../../battle/protocol.ts";

// The items the team builder may offer for one battle format. Reference data
// that only changes with a scrape, so it is fetched once per format.
export const useHoldableItems = (format: BattleFormatKey) =>
    useQuery({
        queryKey: ['holdable-items', format],
        queryFn: () => getJson(`${ENDPOINTS.GET_HOLDABLE_ITEMS}/${format}`, parseHoldableItems),
        staleTime: Infinity,
        placeholderData: keepPreviousData,
    });
