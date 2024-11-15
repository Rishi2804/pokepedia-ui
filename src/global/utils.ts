import {PokemonType} from "./enums.ts";

export function formatText(name: string): string {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

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
    [PokemonType.NORMAL]: "#C1C2C1",
    [PokemonType.FIRE]: "#FC6C6C",
    [PokemonType.WATER]: "#60A5FA",
    [PokemonType.GRASS]: "#5DBE62",
    [PokemonType.ELECTRIC]: "#EDD53E",
    [PokemonType.FLYING]: "#81BAEF",
    [PokemonType.FIGHTING]: "#FFAC59",
    [PokemonType.PSYCHIC]: "#F584A7",
    [PokemonType.DARK]: "#5F606D",
    [PokemonType.GHOST]: "#A284A2",
    [PokemonType.ICE]: "#98D8D8",
    [PokemonType.BUG]: "#9DC12F",
    [PokemonType.GROUND]: "#B78E6F",
    [PokemonType.ROCK]: "#C7C3A9",
    [PokemonType.STEEL]: "#97C2D1",
    [PokemonType.POISON]: "#B563CE",
    [PokemonType.DRAGON]: "#8D98EC",
    [PokemonType.FAIRY]: "#EF97E6"
};

export const TypeToCardBorder: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#9FA19F",
    [PokemonType.FIRE]: "#E62829",
    [PokemonType.WATER]: "#2980EF",
    [PokemonType.GRASS]: "#3FA129",
    [PokemonType.ELECTRIC]: "#FAC001",
    [PokemonType.FLYING]: "#9BB4E8",
    [PokemonType.FIGHTING]: "#FF8001",
    [PokemonType.PSYCHIC]: "#F85888",
    [PokemonType.DARK]: "#624D4E",
    [PokemonType.GHOST]: "#6F4170",
    [PokemonType.ICE]: "#3CCEF3",
    [PokemonType.BUG]: "#91A019",
    [PokemonType.GROUND]: "#915120",
    [PokemonType.ROCK]: "#AFA981",
    [PokemonType.STEEL]: "#60A1B8",
    [PokemonType.POISON]: "#9141CB",
    [PokemonType.DRAGON]: "#5061E1",
    [PokemonType.FAIRY]: "#EF70EF"
};