import {PokemonType} from "./enums.ts";

export interface PokemonSnapshot {
    dexNumber: number;
    pokemonId: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
}