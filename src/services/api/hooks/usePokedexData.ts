import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parsePokedex} from "../parsers/parsePokedex.ts";

export const usePokedexDetails = (pokedex: string) =>
    useQuery({
        queryKey: ['pokedex', pokedex],
        queryFn: () => getJson(`${ENDPOINTS.GET_POKEMON}/${pokedex}`, parsePokedex),
        enabled: !!pokedex,
    });
