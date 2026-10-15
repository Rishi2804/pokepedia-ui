import {ItemDetails} from "../../../global/types.ts";
import {parseDescriptions, toPokemonSnapshot, WireDescription, WirePokemonSnap} from "./shared.ts";

interface WireItemDetail {
    id: number;
    slug: string;
    name: string;
    gen: number | null;
    category: string;
    pocket: string;
    cost: number;
    flingPower: number | null;
    flingEffect: string | null;
    effect: string;
    shortEffect: string;
    sprite: string;
    holdable: boolean;
    showdownId: string | null;
    legalFormats: string[];
    descriptions: WireDescription[];
    pokemon: WirePokemonSnap[];
}

export function parseItem(json: unknown): ItemDetails {
    const wire = json as WireItemDetail;
    return {
        ...wire,
        descriptions: parseDescriptions(wire.descriptions),
        pokemon: wire.pokemon.map(toPokemonSnapshot),
    };
}
