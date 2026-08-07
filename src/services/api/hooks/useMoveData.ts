import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseMove} from "../parsers/parseMove.ts";

export const useMoveDetails = (moveIdOrName: string | number) =>
    useQuery({
        queryKey: ['move', moveIdOrName],
        queryFn: () => getJson(`${ENDPOINTS.GET_MOVE}/${moveIdOrName}`, parseMove),
        enabled: !!moveIdOrName,
    });
