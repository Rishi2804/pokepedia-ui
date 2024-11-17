import {ISpeciesDetails} from "../types.ts";
import {SpeciesDetails} from "../../../global/types.ts";
import {prepareForUI as prepareForUIMon} from "./pokemonTransformer.ts";

export function prepareForUI(species: ISpeciesDetails): SpeciesDetails {
    return {
        ...species,
        pokemon: species.pokemon.map(mon => prepareForUIMon(mon))
    }
}