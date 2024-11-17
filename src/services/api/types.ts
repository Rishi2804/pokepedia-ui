import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "../../global/enums.ts";

export type IApiResponse<T> =
    {ok: true; data: T}
    | {
        ok: false;
        error: string;
        status: number;
        headers?: Headers;
        redirected?: boolean;
    };

/*
    API FETCHES
*/
interface IPokemonAbility {
    abilityId: number;
    abilityName: string;
    isHidden: boolean;
    genRemoved: number | null;
}

interface IStats {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
    bst: number;
}

interface IEvolution {
    id: number;
    fromPokemon: number;
    fromDisplay: string;
    toPokemon: number;
    toDisplay: string;
    details: string[];
    region: string | null;
    altForm: number;
}

interface IPokemonMove {
    name: string;
    type: keyof typeof PokemonType;
    moveClass: keyof typeof MoveClass;
    power: number;
    accuracy: number;
    pp: number;
    levelLearned: number;
}

interface IMoveset {
    versionGroup: keyof typeof VersionGroup;
    learnMethodSets: {
        method: keyof typeof LearnMethod;
        moves: IPokemonMove[];
    }[];
}

export interface IPokemonDetails {
    id: number;
    speciesId: number;
    name: string;
    gen: number;
    type1: keyof typeof PokemonType;
    type2: keyof typeof PokemonType | null;
    abilities: IPokemonAbility[];
    weight: number;
    height: number;
    genderRate: number;
    stats: IStats;
    forms: string[] | null;
    dexEntries: {
        game: keyof typeof Game;
        entry: string;
    }[];
    dexNumbers: {
        dexName: keyof typeof PokedexRegion;
        dexNumber: number;
    }[];
    evolutionChain: IEvolution[];
    movesets: IMoveset[];
}

export interface ISpeciesDetails {
    id: number;
    name: string;
    pokemon: IPokemonDetails[];
}

export interface IPokemonSnapshot {
    dexNumber: number;
    speciesId: number;
    pokemonId: number;
    name: string;
    type1: keyof typeof PokemonType;
    type2: keyof typeof PokemonType | null;
}