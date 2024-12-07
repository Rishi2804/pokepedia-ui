import {create} from 'zustand';
import {PokemonTeam, PokemonTeamMember, TeamCandidate} from "../global/types.ts";

interface TeamStore {
    currentTeam: PokemonTeam;
    currentSelection: TeamCandidate[],
    teams: PokemonTeam[];
    changeTeamName: (name: string) => void;
    addPokemon: (select: TeamCandidate, mon: PokemonTeamMember) => void;
    removePokemon: (index: number) => void;
    editPokemon: (index: number, mon: PokemonTeamMember) => void;
    setCurrentTeam: (team: PokemonTeam) => void;
    validateCurrentTeam: () => boolean;
}

export const useTeamStore = create<TeamStore>((set, getState) => ({
    currentTeam: {
        id: 0,
        name: "My Team",
        pokemon: []
    },
    currentSelection: [],
    teams: [],

    changeTeamName: (name: string) => set((state) => ({ currentTeam: {...state.currentTeam, name: name}})),

    addPokemon: (select: TeamCandidate, mon: PokemonTeamMember) => set((state) => ({
        currentSelection: [...state.currentSelection, select],
        currentTeam: {
            ...state.currentTeam,
            pokemon: [...state.currentTeam.pokemon, mon]
        }
    })),

    removePokemon: (index: number) => set((state) => ({
        currentSelection: state.currentSelection.filter((_, i) => i !== index),
        currentTeam: {
            ...state.currentTeam,
            pokemon: state.currentTeam.pokemon.filter((_, i) => i !== index),
        }
    })),

    editPokemon: (index: number, mon: PokemonTeamMember) => set((state) => {
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

    validateCurrentTeam: () => {
        const currentTeam = getState().currentTeam;
        return currentTeam ? currentTeam.pokemon.length > 0 : false;
    },
}));
