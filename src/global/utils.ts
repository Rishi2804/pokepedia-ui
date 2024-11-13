import {PokemonType} from "./enums.ts";

export const TypeToColor: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#777777",
    [PokemonType.FIRE]: "#c26746",
    [PokemonType.WATER]: "#578bd3",
    [PokemonType.GRASS]: "#5d8a44",
    [PokemonType.ELECTRIC]: "#d1b752",
    [PokemonType.FLYING]: "#7d9ec4",
    [PokemonType.FIGHTING]: "#ca8e43",
    [PokemonType.PSYCHIC]: "#c87183",
    [PokemonType.DARK]: "#433f3e",
    [PokemonType.GHOST]: "#594061",
    [PokemonType.ICE]: "#79bcc0",
    [PokemonType.BUG]: "#969543",
    [PokemonType.GROUND]: "#8d6c42",
    [PokemonType.ROCK]: "#9e9b7c",
    [PokemonType.STEEL]: "#799fbb",
    [PokemonType.POISON]: "#7951ba",
    [PokemonType.DRAGON]: "#5462ab",
    [PokemonType.FAIRY]: "#c78bd5"
};

export const TypeToCardColor: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#D2B48C",
    [PokemonType.FIRE]: "#e03a3a",
    [PokemonType.WATER]: "#1E90FF",
    [PokemonType.GRASS]: "#50C878",
    [PokemonType.ELECTRIC]: "#fad343",
    [PokemonType.FLYING]: "#87CEEB",
    [PokemonType.FIGHTING]: "#bf5858",
    [PokemonType.PSYCHIC]: "#882eff",
    [PokemonType.DARK]: "#414063",
    [PokemonType.GHOST]: "#7B62A3",
    [PokemonType.ICE]: "#98D8D8",
    [PokemonType.BUG]: "#A8B820",
    [PokemonType.GROUND]: "#735139",
    [PokemonType.ROCK]: "#63594f",
    [PokemonType.STEEL]: "#808080",
    [PokemonType.POISON]: "#b34fb3",
    [PokemonType.DRAGON]: "#fc883a",
    [PokemonType.FAIRY]: "#EE99AC"
};
