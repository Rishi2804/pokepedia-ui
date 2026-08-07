import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseAbilities} from "../parsers/parseAbilities.ts";

export const useAbilitiesDetails = () =>
    useQuery({
        queryKey: ['abilities'],
        queryFn: () => getJson(`${ENDPOINTS.GET_ABILITY}/`, parseAbilities),
    });
