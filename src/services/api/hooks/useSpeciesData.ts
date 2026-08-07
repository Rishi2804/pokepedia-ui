import { useState, useEffect } from 'react';
import {makeGetRequest} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseSpecies} from "../parsers/parseSpecies.ts";
import {SpeciesDetails} from "../../../global/types.ts";

interface ISpeciesProps {
    speciesIdOrName: string | number;
}

export const useSpeciesDetails = ({ speciesIdOrName }: ISpeciesProps) => {
    const [data, setData] = useState<SpeciesDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!speciesIdOrName) {
            setError('No Pokémon ID or name provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_SPECIES_LIST}/${speciesIdOrName}`, parseSpecies);

                if (response.ok) {
                    setData(response.data);  // Set the Pokémon data if successful
                } else {
                    setError(response.error || 'An error occurred while fetching Species details');
                }
            } catch (err) {
                console.error(err)
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);  // End loading state
            }
        };

        fetch();
    }, [speciesIdOrName]);

    return { data, loading, error };

}
