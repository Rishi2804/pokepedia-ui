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
        id: wire.id,
        slug: wire.slug,
        name: wire.name,
        gen: wire.gen,
        category: wire.category,
        pocket: wire.pocket,
        cost: wire.cost,
        flingPower: wire.flingPower,
        flingEffect: wire.flingEffect,
        effect: wire.effect,
        shortEffect: wire.shortEffect,
        sprite: wire.sprite,
        holdable: wire.holdable,
        showdownId: wire.showdownId,
        legalFormats: wire.legalFormats,
        descriptions: parseDescriptions(wire.descriptions),
        pokemon: wire.pokemon.map(toPokemonSnapshot),
    };
}
