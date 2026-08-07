import {AbilityDetails} from "../../../global/types.ts";
import {parseDescriptions, toPokemonSnapshot, WireDescription, WirePokemonSnap} from "./shared.ts";

interface WireAbilityDetail {
    id: number;
    name: string;
    gen: number;
    effect: string;
    descriptions: WireDescription[];
    pokemon: WirePokemonSnap[];
}

export function parseAbility(json: unknown): AbilityDetails {
    const wire = json as WireAbilityDetail;
    return {
        name: wire.name,
        gen: wire.gen,
        effect: wire.effect,
        descriptions: parseDescriptions(wire.descriptions),
        pokemon: wire.pokemon.map(toPokemonSnapshot),
    };
}
