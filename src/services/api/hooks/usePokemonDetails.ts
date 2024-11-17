import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.servies.ts";
import {ENDPOINTS} from "../constants.ts";
import {prepareForUI} from "../transformers/pokemonTransformer.ts";
import {PokemonDetails} from "../../../global/types.ts";

interface ISinglePokemonProps {
    pokemonIdOrName: string | number;
}

export const usePokemonDetails = ({ pokemonIdOrName }: ISinglePokemonProps) => {
    const [data, setData] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pokemonIdOrName) {
            setError('No Pokémon ID or name provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_SINGLE_POKEMON}/${pokemonIdOrName}`);

                if (response.ok) {
                    setData(prepareForUI(response.data));  // Set the Pokémon data if successful
                } else {
                    setError(response.error || 'An error occurred while fetching Pokémon details');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [pokemonIdOrName]);

    return { data, loading, error };

}