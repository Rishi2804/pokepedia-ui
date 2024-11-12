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
    type: PokemonType;
    moveClass: MoveClass;
    power: number;
    accuracy: number;
    pp: number;
    levelLearned: number;
}

interface IMoveset {
    versionGroup: VersionGroup;
    learnMethodSets: {
        method: LearnMethod;
        moves: IPokemonMove[];
    }[];
}

export interface IPokemonDetails {
    id: number;
    speciesId: number;
    name: string;
    gen: number;
    type1: PokemonType;
    type2: PokemonType | null;
    abilities: IPokemonAbility[];
    weight: number;
    height: number;
    genderRate: number;
    stats: IStats;
    forms: string | null;
    dexEntries: Array<{
        game: keyof typeof Game;
        entry: string;
    }>;
    dexNumbers: Array<{
        dexName: keyof typeof PokedexRegion;
        dexNumber: number;
    }>
    evolutionChain: IEvolution[];
    moveset: IMoveset[];
}

export interface ISpeciesDetails {
    pokemon: IPokemonDetails[];
}