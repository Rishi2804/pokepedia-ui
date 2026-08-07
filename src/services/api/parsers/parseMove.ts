import {MoveDetails} from "../../../global/types.ts";
import {LearnMethod, MoveClass, PokemonType, VersionGroup} from "../../../global/enums.ts";
import {asEnum} from "../parse.ts";
import {parseDescriptions, toPokemonSnapshot, WireDescription, WirePokemonSnap} from "./shared.ts";

interface WirePastMoveValues {
    movePower: number | null;
    moveAccuracy: number | null;
    movePP: number | null;
    versionGroups: string[];
}

interface WirePokemonLearnable {
    method: string;
    pokemon: WirePokemonSnap[];
}

interface WireMoveDetail {
    id: number;
    name: string;
    type: string;
    gen: number;
    moveClass: string;
    movePower: number | null;
    moveAccuracy: number | null;
    movePP: number | null;
    pastMoveValues: WirePastMoveValues[];
    effect: string;
    descriptions: WireDescription[];
    pokemon: WirePokemonLearnable[];
}

export function parseMove(json: unknown): MoveDetails {
    const wire = json as WireMoveDetail;
    return {
        id: wire.id,
        name: wire.name,
        type: asEnum(PokemonType, wire.type, 'type'),
        gen: wire.gen,
        moveClass: asEnum(MoveClass, wire.moveClass, 'moveClass'),
        movePower: wire.movePower,
        moveAccuracy: wire.moveAccuracy,
        movePP: wire.movePP,
        pastMoveValues: wire.pastMoveValues.map(v => ({
            movePower: v.movePower,
            moveAccuracy: v.moveAccuracy,
            movePP: v.movePP,
            versionGroups: v.versionGroups.map(vg => asEnum(VersionGroup, vg, 'versionGroups')),
        })),
        effect: wire.effect,
        descriptions: parseDescriptions(wire.descriptions),
        pokemonLearnable: wire.pokemon.map(list => ({
            method: asEnum(LearnMethod, list.method, 'method'),
            pokemon: list.pokemon.map(toPokemonSnapshot),
        })),
    };
}
