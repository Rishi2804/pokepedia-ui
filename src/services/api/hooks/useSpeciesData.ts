import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseSpecies} from "../parsers/parseSpecies.ts";

export const useSpeciesDetails = (speciesIdOrName: string | number) =>
    useQuery({
        queryKey: ['species', speciesIdOrName],
        queryFn: () => getJson(`${ENDPOINTS.GET_SPECIES_LIST}/${speciesIdOrName}`, parseSpecies),
        enabled: !!speciesIdOrName,
    });
