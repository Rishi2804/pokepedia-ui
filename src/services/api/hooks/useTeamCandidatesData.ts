import { useState, useEffect } from 'react';
import { makeGetRequest } from "../api.service.ts";
import { ENDPOINTS } from "../constants.ts";
import { parseTeamCandidates } from "../parsers/parseTeamCandidates.ts";
import {CandidatesList} from "../../../global/types.ts";

interface IPokedexProps {
    versionString: string;
}

export const useTeamCandidatesDetails = ({ versionString }: IPokedexProps) => {
    const [data, setData] = useState<CandidatesList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!versionString) {
            setError('No team candidates provided');
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await makeGetRequest(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}`, parseTeamCandidates);
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
    }, [versionString]);

    return { data, loading, error };
};
