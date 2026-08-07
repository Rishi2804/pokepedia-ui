import { useState, useEffect } from 'react';
import { makeGetRequest } from "../api.service.ts";
import { ENDPOINTS } from "../constants.ts";
import { parsePokedex } from "../parsers/parsePokedex.ts";
import {PokedexDetails} from "../../../global/types.ts";

interface IPokedexProps {
    pokedex: string;
}

export const usePokedexDetails = ({ pokedex }: IPokedexProps) => {
    const [data, setData] = useState<PokedexDetails[]>([]);
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
            setError(null);

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_POKEMON}/${pokedex}`, parsePokedex);
                if (response.ok) {
                    setData(response.data)
                } else {
                    setError('An unknown error occurred');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [pokedex]);

    return { data, loading, error };
};
