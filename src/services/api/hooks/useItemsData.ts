import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseItems} from "../parsers/parseItems.ts";

export const useItemsDetails = () =>
    useQuery({
        queryKey: ['items'],
        queryFn: () => getJson(`${ENDPOINTS.GET_ITEM}/`, parseItems),
    });
