import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.servies.ts";
import {ENDPOINTS} from "../constants.ts";
import {IPokemonSnapshot} from "../types.ts";
import {prepareForUI} from "../transformers/pokedexTransformer.ts";

interface IPokedexProps {
    pokedex: string | number;
}

export const usePokedexDetails = ({ pokedex }: IPokedexProps) => {
    const [data, setData] = useState<IPokemonSnapshot[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pokedex) {
            setError('No Pokedex provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_POKEMON}/${pokedex}`);

                if (response.ok) {
                    setData(prepareForUI(response.data));  // Set the Pokémon data if successful
                } else {
                    setError(response.error || 'An error occurred while fetching Pokémon details');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);  // End loading state
            }
        };

        fetch();
    }, [pokedex]);

    return { data, loading, error };

}