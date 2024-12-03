import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.servies.ts";
import {ENDPOINTS} from "../constants.ts";
import {AbilitySnapshot} from "../../../global/types.ts";
import {prepareForUI} from "../transformers/abilitiesTransformer.ts";

export const useAbilitiesDetails = () => {
    const [data, setData] = useState<AbilitySnapshot[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_ABILITY}/`);

                if (response.ok) {
                    setData(prepareForUI(response.data));
                } else {
                    setError(response.error || 'An error occurred while fetching Abilities');
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