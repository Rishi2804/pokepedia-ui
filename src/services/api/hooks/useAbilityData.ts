import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.servies.ts";
import {ENDPOINTS} from "../constants.ts";
import {prepareForUI} from "../transformers/abilityTransformer.ts";
import {AbilityDetails} from "../../../global/types.ts";

interface IMovesProps {
    abilityIdOrName: string | number;
}

export const useAbilityDetails = ({ abilityIdOrName }: IMovesProps) => {
    const [data, setData] = useState<AbilityDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!abilityIdOrName) {
            setError('No ability ID or name provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_ABILITY}/${abilityIdOrName}`);

                if (response.ok) {
                    setData(prepareForUI(response.data));
                } else {
                    setError(response.error || 'An error occurred while fetching Ability');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [abilityIdOrName]);

    return { data, loading, error };

}