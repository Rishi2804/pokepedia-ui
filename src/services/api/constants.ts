export const API_POKEMON_ROOT_URL = `${import.meta.env.VITE_POKEMON_API}`;
export const API_HEALTH_ROOT = `${import.meta.env.VITE_HEALTH_ROOT}`;

/*
    All Endpoints in the system
 */
export const ENDPOINTS = {
    GET_POKEMON: `${API_POKEMON_ROOT_URL}/pokedex`,
    GET_SINGLE_POKEMON: `${API_POKEMON_ROOT_URL}/pokemon`,
    GET_SPECIES_LIST: `${API_POKEMON_ROOT_URL}/species`,

    GET_MOVE: `${API_POKEMON_ROOT_URL}/move`,

    GET_ABILITY: `${API_POKEMON_ROOT_URL}/ability`,

    GET_TEAM_CANDIDATES: `${API_POKEMON_ROOT_URL}/team-building`,
}