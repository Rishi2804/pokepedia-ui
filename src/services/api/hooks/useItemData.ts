import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseItem} from "../parsers/parseItem.ts";

export const useItemDetails = (itemIdOrSlug: string | number) =>
    useQuery({
        queryKey: ['item', itemIdOrSlug],
        queryFn: () => getJson(`${ENDPOINTS.GET_ITEM}/${itemIdOrSlug}`, parseItem),
        enabled: !!itemIdOrSlug,
    });
