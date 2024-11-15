import { useState, useEffect } from 'react';
import { makeGetRequest } from "../api.servies.ts";
import { ENDPOINTS } from "../constants.ts";
import { prepareForUI } from "../transformers/pokedexTransformer.ts";
import { PokemonSnapshot } from "../../../global/types.ts";
import {formatText} from "../../../global/utils.ts";

interface IPokedexProps {
    pokedexes: string[];
}

export const usePokedexDetails = ({ pokedexes }: IPokedexProps) => {
    const [data, setData] = useState<{ dex: string; data: PokemonSnapshot[] }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pokedexes || pokedexes.length === 0) {
            setError('No Pokedex provided');
            setLoading(false);
            return;
        }

        function formatDexName(dexName: string): string {
            switch (dexName) {
                case 'kalos-central':
                    return 'Central Kalos';
                case 'kalos-coastal':
                    return 'Coastal Kalos';
                case 'kalos-mountain':
                    return 'Mountain Kalos';
                case 'original-alola':
                    return 'Alola';
                case 'updated-alola':
                    return 'Alola';
                case 'original-melemele':
                    return 'Melemele';
                case 'updated-melemele':
                    return 'Melemele';
                case 'original-akala':
                    return 'Akala';
                case 'updated-akala':
                    return 'Akala';
                case 'original-ulaula':
                    return 'Ulaula';
                case 'updated-ulaula':
                    return 'Ulaula';
                case 'original-poni':
                    return 'Poni';
                case 'updated-poni':
                    return 'Poni';
                default:
                    return formatText(dexName);
            }
        }

        const fetch = async () => {
            setLoading(true);
            setError(null);

            const fetchedData: { dex: string; data: PokemonSnapshot[] }[] = [];

            for (const pokedex of pokedexes) {
                try {
                    const response = await makeGetRequest(`${ENDPOINTS.GET_POKEMON}/${pokedex}`);

                    if (response.ok) {
                        if (pokedex === 'extended-sinnoh') {
                            const fullDex = prepareForUI(response.data)
                            const seperator = fullDex.findIndex(pokemon => pokemon.dexNumber === 152);
                            const originalSinnoh = fullDex.slice(0, seperator);
                            const platinumExpansion = fullDex.slice(seperator);
                            fetchedData.push({dex: 'Original Sinnoh', data: originalSinnoh});
                            fetchedData.push({dex: 'Platinum Expansion', data: platinumExpansion});
                        } else if (pokedex === 'national') {
                            const fullDex = prepareForUI(response.data)
                            const seperatorNums = [1, 152, 252, 387, 494, 650, 722, 810, 906]
                            const seperators = seperatorNums.map((num) => fullDex.findIndex(pokemon => pokemon.dexNumber === num));
                            for (let i = 1; i <= seperatorNums.length; i++) {
                                if (i === seperatorNums.length) {
                                    fetchedData.push({ dex: `Gen ${i}`, data: fullDex.slice(seperators[i-1]) });
                                } else {
                                    fetchedData.push({ dex: `Gen ${i}`, data: fullDex.slice(seperators[i-1], seperators[i]) });
                                }
                            }
                        }
                        else fetchedData.push({ dex: formatDexName(pokedex), data: prepareForUI(response.data) });
                    } else {
                        setError(response.error || 'An error occurred while fetching Pokémon details');
                        break;
                    }
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                    break;
                }
            }

            // After fetching all data, update the state
            if (fetchedData.length > 0) {
                setData(fetchedData);
            }
            setLoading(false);
        };

        fetch();
    }, [pokedexes]);

    return { data, loading, error };
};
