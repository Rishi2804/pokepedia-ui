import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseMoves} from "../parsers/parseMoves.ts";
import {MoveSnapshot} from "../../../global/types.ts";

export const useMovesDetails = () => {
    const [data, setData] = useState<MoveSnapshot[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_MOVE}/`, parseMoves);

                if (response.ok) {
                    setData(response.data);  // Set the Pokémon data if successful
                } else {
                    setError(response.error || 'An error occurred while fetching Moves');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    return { data, loading, error };

}
