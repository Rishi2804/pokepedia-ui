import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "./enums.ts";

export interface PokemonSnapshot {
    dexNumber: number;
    speciesId: number;
    pokemonId: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
}

interface PokemonAbility {
    abilityId: number;
    abilityName: string;
    isHidden: boolean;
    genRemoved: number | null;
}

interface Stats {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
    bst: number;
}

interface Evolution {
    id: number;
    fromPokemon: number;
    fromDisplay: string;
    toPokemon: number;
    toDisplay: string;
    details: string[];
    region: string | null;
    altForm: number;
}

interface PokemonMove {
    name: string;
    type: PokemonType;
    moveClass: MoveClass;
    power: number;
    accuracy: number;
    pp: number;
    levelLearned: number;
}

interface Moveset {
    versionGroup: VersionGroup;
    learnMethodSets: {
        method: LearnMethod;
        moves: PokemonMove[];
    }[];
}

export interface PokemonDetails {
    id: number;
    speciesId: number;
    name: string;
    gen: number;
    type1: PokemonType;
    type2: PokemonType | null;
    abilities: PokemonAbility[];
    weight: number;
    height: number;
    genderRate: number;
    stats: Stats;
    forms: string[] | null;
    dexEntries: {
        game: Game;
        entry: string;
    }[];
    dexNumbers: {
        dexName: PokedexRegion;
        dexNumber: number;
    }[];
    evolutionChain: Evolution[];
    movesets: Moveset[];
}

export interface SpeciesDetails {
    id: number;
    name: string;
    pokemon: PokemonDetails[];
}

export interface TypeDefences {
    x0: PokemonType[],
    x1_4: PokemonType[],
    x1_2: PokemonType[],
    x2: PokemonType[],
    x4: PokemonType[]
}