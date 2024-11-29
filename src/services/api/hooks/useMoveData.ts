import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.servies.ts";
import {ENDPOINTS} from "../constants.ts";
import {prepareForUI} from "../transformers/moveSnapTransformer.ts";
import {MoveSnapshot} from "../../../global/types.ts";

interface IMovesProps {
    moveIdOrName: string | number;
}

export const useMovesDetails = ({ moveIdOrName }: IMovesProps) => {
    const [data, setData] = useState<MoveSnapshot[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!moveIdOrName) {
            setError('No move ID or name provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_MOVE}/`);

                if (response.ok) {
                    setData(prepareForUI(response.data));  // Set the Pokémon data if successful
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
    }, [moveIdOrName]);

    return { data, loading, error };

}