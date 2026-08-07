import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parsePokemon} from "../parsers/parsePokemon.ts";

export const usePokemonDetails = (pokemonIdOrName: string | number) =>
    useQuery({
        queryKey: ['pokemon', pokemonIdOrName],
        queryFn: () => getJson(`${ENDPOINTS.GET_SINGLE_POKEMON}/${pokemonIdOrName}`, parsePokemon),
        enabled: !!pokemonIdOrName,
    });
