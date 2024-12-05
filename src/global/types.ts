import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "./enums.ts";

export interface PokemonSnapshot {
    dexNumber: number;
    speciesId: number;
    pokemonId: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
}

export interface PokedexDetails {
    name: string;
    pokemon: PokemonSnapshot[];
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

export interface PokemonMoveSnapshot {
    id: number;
    name: string;
    type: PokemonType;
    moveClass: MoveClass;
    power: number;
    accuracy: number;
    pp: number;
    levelLearned: number;
}

export interface Moveset {
    versionGroup: VersionGroup;
    learnMethodSets: {
        method: LearnMethod;
        moves: PokemonMoveSnapshot[];
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

interface GroupedDescription {
    versionGroups: VersionGroup[];
    description: string;
}

export interface MoveSnapshot {
    id: number;
    name: string;
    type: PokemonType;
    moveClass: MoveClass;
    power: number;
    accuracy: number;
    pp: number;
    gen: number;
}

export interface MoveDetails {
    id: number;
    name: string;
    type: PokemonType;
    gen: number;
    moveClass: MoveClass;
    movePower: number | null;
    moveAccuracy: number | null;
    movePP: number | null;
    pastMoveValues: {
        movePower: number | null;
        moveAccuracy: number | null;
        movePP: number | null;
        versionGroups: VersionGroup[];
    }[];
    effect: string;
    descriptions: GroupedDescription[];
    pokemonLearnable: {
        method: LearnMethod;
        pokemon: PokemonSnapshot[]
    }[];
}

export interface AbilitySnapshot {
    name: string;
    gen: number;
}

export interface AbilityDetails {
    name: string;
    gen: number;
    effect: string;
    descriptions: GroupedDescription[];
    pokemon: PokemonSnapshot[]
}

export interface TypeDefences {
    x0: PokemonType[],
    x1_4: PokemonType[],
    x1_2: PokemonType[],
    x2: PokemonType[],
    x4: PokemonType[]
}

export interface PokemonTeamMember {
    id: number;
    name: string;
    shiny?: boolean;
    female?: boolean;
    ability: string;
    moves?: {
        name: string;
        type: PokemonType;
        moveClass: MoveClass;
    }[];
}

export interface PokemonTeam {
    id: number;
    name: string;
    version: VersionGroup;
    pokemon: PokemonTeamMember[];
}