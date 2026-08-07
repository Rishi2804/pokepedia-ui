import {SpeciesDetails} from "../../../global/types.ts";
import {parsePokemon, WirePokemonDetails} from "./parsePokemon.ts";

interface WireSpeciesDetails {
    id: number;
    name: string;
    pokemon: WirePokemonDetails[];
}

export function parseSpecies(json: unknown): SpeciesDetails {
    const wire = json as WireSpeciesDetails;
    return {
        id: wire.id,
        name: wire.name,
        pokemon: wire.pokemon.map(parsePokemon),
    };
}
