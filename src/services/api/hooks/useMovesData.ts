import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseMoves} from "../parsers/parseMoves.ts";

export const useMovesDetails = () =>
    useQuery({
        queryKey: ['moves'],
        queryFn: () => getJson(`${ENDPOINTS.GET_MOVE}/`, parseMoves),
    });
