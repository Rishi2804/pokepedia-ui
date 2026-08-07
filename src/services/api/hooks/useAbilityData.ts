import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseAbility} from "../parsers/parseAbility.ts";

export const useAbilityDetails = (abilityIdOrName: string | number) =>
    useQuery({
        queryKey: ['ability', abilityIdOrName],
        queryFn: () => getJson(`${ENDPOINTS.GET_ABILITY}/${abilityIdOrName}`, parseAbility),
        enabled: !!abilityIdOrName,
    });
