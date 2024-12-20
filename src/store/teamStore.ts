import {create} from 'zustand';
import {PokemonTeam, PokemonTeamMember} from "../global/types.ts";
import {VersionGroup} from "../global/enums.ts";

const loadTeamsFromLocalStorage = (): PokemonTeam[] => {
    const teams = localStorage.getItem('teams');
    return teams ? JSON.parse(teams) : [];
};

const saveTeamsToLocalStorage = (teams: PokemonTeam[]): void => {
    localStorage.setItem('teams', JSON.stringify(teams));
};

interface TeamStore {
    currentTeam: PokemonTeam | null;
    teams: PokemonTeam[];
    removedPokemonCache: Map<number, PokemonTeamMember>;
    changeTeamName: (name: string) => void;
    addPokemon: (mon: PokemonTeamMember) => void;
    removePokemon: (index: number) => void;
    editPokemon: (index: number, mon: PokemonTeamMember) => void;
    setCurrentTeam: (team: PokemonTeam) => void;
    setTeams: (teams: PokemonTeam[]) => void;
    validateCurrentTeam: () => boolean;
    createNewTeam: (versionGroup: VersionGroup | null) => void;
    startEditingTeam: (id: number) => void;
    saveEditingTeam: () => void;
    deleteTeam: (id: number) => void;
}

export const useTeamStore = create<TeamStore>((set, getState) => ({
    currentTeam: null,
    teams: loadTeamsFromLocalStorage(),
    removedPokemonCache: new Map(),

    changeTeamName: (name: string) => set((state) => {
        if (!state.currentTeam) return state
        return ({currentTeam: {...state.currentTeam, name: name}});
    }),

    addPokemon: (mon: PokemonTeamMember) => set((state) => {
        if (!state.currentTeam) return state;
        return ({
            currentTeam: {
                ...state.currentTeam,
                pokemon: [...state.currentTeam.pokemon, state.removedPokemonCache.get(mon.id) ?? mon]
            }
        });
    }),

    removePokemon: (index: number) => set((state) => {
        if (!state.currentTeam) return state;

        const pokemonToRemove = state.currentTeam.pokemon[index];

        const newCache = new Map(state.removedPokemonCache);

        if (pokemonToRemove) {
            newCache.set(pokemonToRemove.id, pokemonToRemove);
        }
        return ({
            removedPokemonCache: newCache,
            currentTeam: {
                ...state.currentTeam,
                pokemon: state.currentTeam.pokemon.filter((_, i) => i !== index),
            }
        });
    }),

    editPokemon: (index: number, mon: PokemonTeamMember) => set((state) => {
        if (!state.currentTeam) return state;

        const updatedPokemon = [...state.currentTeam.pokemon];
        updatedPokemon[index] = mon;

        return {
            currentTeam: {
                ...state.currentTeam,
                pokemon: updatedPokemon
            }
        };
    }),

    setCurrentTeam: (team: PokemonTeam) => set({ currentTeam: team }),

    setTeams: (teams: PokemonTeam[]) => set({ teams: teams }),

    validateCurrentTeam: () => {
        const currentTeam = getState().currentTeam;
        return currentTeam ? (currentTeam.pokemon.length > 0 && currentTeam.name.length > 0) : false;
    },

    createNewTeam: (versionGroup: VersionGroup | null) => set({
        currentTeam: {
            id: getState().teams.length > 0 ? getState().teams[getState().teams.length-1].id + 1 : 1,
            name: `My ${versionGroup ?? "Home"} Team`,
            versionGroup: versionGroup,
            pokemon: []
        }
    }),

    startEditingTeam: (id: number) => set((state) => {
        const selectedTeam = state.teams.find((team) => team.id === id);
        if (!selectedTeam) return state;
        return {
            currentTeam: {...selectedTeam}
        }
    }),

    saveEditingTeam: () => set((state) => {
        if (!state.currentTeam || !state.validateCurrentTeam()) return state;
        const index = state.teams.findIndex((team) => team.id === state.currentTeam?.id);
        if (index < 0) {
            const updatedTeams = [...state.teams, {...state.currentTeam}]
            saveTeamsToLocalStorage(updatedTeams);
            return {
                teams: updatedTeams
            }
        }
        const updatedTeams = [...state.teams];
        updatedTeams[index] = {...state.currentTeam}
        saveTeamsToLocalStorage(updatedTeams);
        return {
            teams: updatedTeams,
            removedPokemonCache: new Map()
        }
    }),

    deleteTeam: (id: number) => set((state) => {
        const updatedTeams = state.teams.filter((team) => team.id !== id)
        saveTeamsToLocalStorage(updatedTeams)
        return {
            teams: updatedTeams,
        }
    })

}));
