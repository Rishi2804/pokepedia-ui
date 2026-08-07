import {PokemonDetails, PokemonMoveSnapshot} from "../../../global/types.ts";
import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "../../../global/enums.ts";
import {asEnum, asNullableEnum} from "../parse.ts";

interface WireMove {
    id: number;
    name: string;
    type: string;
    moveClass: string;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    levelLearned: number;
}

export interface WirePokemonDetails {
    id: number;
    speciesId: number;
    name: string;
    gen: number;
    type1: string;
    type2: string | null;
    abilities: { id: number; name: string; isHidden: boolean; genRemoved: number | null }[];
    weight: number;
    height: number;
    genderRate: number;
    stats: { hp: number; atk: number; def: number; spatk: number; spdef: number; speed: number; bst: number };
    forms: string[] | null;
    dexEntries: { game: string; entry: string }[];
    dexNumbers: { dexName: string; dexNumber: number }[];
    evolutionChain: {
        id: number;
        fromPokemon: number;
        fromDisplay: string;
        toPokemon: number;
        toDisplay: string;
        details: string[];
        region: string | null;
        altForm: number;
    }[];
    movesets: { versionGroup: string; learnMethodSets: { method: string; moves: WireMove[] }[] }[];
}

function parseMoveSnap(m: WireMove): PokemonMoveSnapshot {
    return {
        ...m,
        type: asEnum(PokemonType, m.type, 'type'),
        moveClass: asEnum(MoveClass, m.moveClass, 'moveClass'),
    };
}

export function parsePokemon(json: unknown): PokemonDetails {
    const wire = json as WirePokemonDetails;
    return {
        ...wire,
        type1: asEnum(PokemonType, wire.type1, 'type1'),
        type2: asNullableEnum(PokemonType, wire.type2, 'type2'),
        dexEntries: wire.dexEntries.map(entry => ({
            game: asEnum(Game, entry.game, 'game'),
            entry: entry.entry,
        })),
        dexNumbers: wire.dexNumbers.map(entry => ({
            dexName: asEnum(PokedexRegion, entry.dexName, 'dexName'),
            dexNumber: entry.dexNumber,
        })),
        movesets: wire.movesets.map(moveset => ({
            versionGroup: asEnum(VersionGroup, moveset.versionGroup, 'versionGroup'),
            learnMethodSets: moveset.learnMethodSets.map(set => ({
                method: asEnum(LearnMethod, set.method, 'method'),
                moves: set.moves.map(parseMoveSnap),
            })),
        })),
    };
}
