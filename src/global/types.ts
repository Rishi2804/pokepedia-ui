import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "./enums.ts";

interface IDNamePair {
    id: number;
    name: string;
}

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

export interface TypeCoverage {
    x0: PokemonType[],
    x1_2: PokemonType[],
    x2: PokemonType[]
}

export interface TeamMove {
    id: number;
    name: string;
    type: PokemonType;
    moveClass: MoveClass;
}

export interface TeamCandidate {
    id: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
    gen: number;
    genderRate: number;
    abilities: {
        id: number;
        name: string;
    }[];
    moves: TeamMove[];
}

export interface CandidatesList {
    listName: string;
    pokemon: TeamCandidate[]
}

export interface PokemonTeamMember {
    id: number;
    name: string;
    shiny: boolean;
    gender: 'male' | 'female' | 'genderless';
    genderLock: boolean;
    type1: PokemonType;
    type2: PokemonType | null;
    teraType?: PokemonType;
    ability: IDNamePair;
    moves: (TeamMove | null)[];
    moveCandidates: TeamMove[];
    abilityCandidates: IDNamePair[];
}

export interface PokemonTeam {
    id: number;
    name: string;
    versionGroup: VersionGroup | null;
    pokemon: PokemonTeamMember[];
}
