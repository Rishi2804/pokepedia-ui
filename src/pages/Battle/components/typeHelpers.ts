import {MoveClass, PokemonType} from "../../../global/enums.ts";

// Showdown/@pkmn move data spells types and categories capitalized
// ("Electric", "Physical"); the site's enums key them uppercase. Both
// fall back to a safe default rather than crashing on an unexpected value.
export function toPokemonType(type: string): PokemonType {
    const upper = type.toUpperCase();
    return (upper in PokemonType ? upper : PokemonType.NORMAL) as PokemonType;
}

export function toMoveClass(category: string): MoveClass {
    const upper = category.toUpperCase();
    return (upper in MoveClass ? upper : MoveClass.STATUS) as MoveClass;
}
