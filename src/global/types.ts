import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "./enums.ts";
import type {NatureName} from "./data/natures.ts";

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
    id: number;
    name: string;
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
    power: number | null;
    accuracy: number | null;
    pp: number | null;
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
    power: number | null;
    accuracy: number | null;
    pp: number | null;
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
    id: number;
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

// Showdown's stat keys, used for base stats, EVs, and IVs alike so the team
// builder's model maps onto Showdown's PokemonSet without translation.
export type StatKey = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
export type StatSpread = Record<StatKey, number>;

export interface TeamCandidateSummary {
    id: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
    gen: number;
    genderRate: number;
}

export interface TeamCandidate extends TeamCandidateSummary {
    abilities: {
        id: number;
        name: string;
    }[];
    moves: TeamMove[];
    baseStats: StatSpread;
}

export interface CandidatesList {
    listName: string;
    pokemon: TeamCandidateSummary[]
}

export interface PokemonTeamMember {
    // Identity — display-only, never sent to the Showdown engine.
    id: number;
    name: string;
    type1: PokemonType;
    type2: PokemonType | null;
    gen: number;

    // Showdown PokemonSet fields (sim/teams.ts), so this maps onto the engine
    // without a lossy translation step. moveCandidates/abilityCandidates are
    // deliberately absent — the set editor fetches those from
    // useTeamCandidateDetails(versionSlug, id) instead of caching them per team.
    nickname: string | null;
    shiny: boolean;
    gender: 'male' | 'female' | 'genderless';
    genderLock: boolean;
    teraType?: PokemonType;
    ability: IDNamePair | null;
    moves: (TeamMove | null)[];
    level: number;
    nature: NatureName;
    item: string | null;
    evs: StatSpread;
    ivs: StatSpread;
    happiness: number;
    pokeball: string;
    hpType?: PokemonType;
    dynamaxLevel: number;
    gigantamax: boolean;
}

export interface PokemonTeam {
    id: number;
    name: string;
    versionGroup: VersionGroup | null;
    pokemon: PokemonTeamMember[];
}
