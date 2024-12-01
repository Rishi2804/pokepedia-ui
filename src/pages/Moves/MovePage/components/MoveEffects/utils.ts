import {PokemonType} from "../../../../../global/enums.ts";

export function getZMovePower(id: number, basePower: number): number {
    if (id === 72) {
        return 120;
    } else if (id === 311 || id === 506) {
        return 160;
    } else if (id === 557) {
        return 220;
    } else if (id === 560) {
        return 170;
    } else if (id === 687) {
        return 140;
    }

    if (basePower >= 0 && basePower <= 55) {
        return 100;
    } else if (basePower >= 60 && basePower <= 65) {
        return 120;
    } else if (basePower >= 70 && basePower <= 75) {
        return 140;
    } else if (basePower >= 80 && basePower <= 85) {
        return 160;
    } else if (basePower >= 90 && basePower <= 95) {
        return 175;
    } else if (basePower === 100) {
        return 180;
    } else if (basePower === 110) {
        return 185;
    } else if (basePower >= 120 && basePower <= 125) {
        return 190;
    } else if (basePower === 130) {
        return 195;
    } else if (basePower >= 140) {
        return 200;
    }
    return 0;
}

export const typeToZMove: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "Breakneck Blitz",
    [PokemonType.FIGHTING]: "All-Out Pummeling",
    [PokemonType.FLYING]: "Supersonic Skystrike",
    [PokemonType.POISON]: "Acid Downpour",
    [PokemonType.GROUND]: "Tectonic Rage",
    [PokemonType.ROCK]: "Continental Crush",
    [PokemonType.BUG]: "Savage Spin-Out",
    [PokemonType.GHOST]: "Never-Ending Nightmare",
    [PokemonType.STEEL]: "Corkscrew Crash",
    [PokemonType.FIRE]: "Inferno Overdrive",
    [PokemonType.WATER]: "Hydro Vortex",
    [PokemonType.GRASS]: "Bloom Doom",
    [PokemonType.ELECTRIC]: "Gigavolt Havoc",
    [PokemonType.PSYCHIC]: "Shattered Psyche",
    [PokemonType.ICE]: "Subzero Slammer",
    [PokemonType.DRAGON]: "Devastating Drake",
    [PokemonType.DARK]: "Black Hole Eclipse",
    [PokemonType.FAIRY]: "Twinkle Tackle"
}

export const typeToZCrystal: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "Normalium Z",
    [PokemonType.FIGHTING]: "Fightinium Z",
    [PokemonType.FLYING]: "Flyinium Z",
    [PokemonType.POISON]: "Poisonium Z",
    [PokemonType.GROUND]: "Groundium Z",
    [PokemonType.ROCK]: "Rockium Z",
    [PokemonType.BUG]: "Buginium Z",
    [PokemonType.GHOST]: "Ghostium Z",
    [PokemonType.STEEL]: "Steelium Z",
    [PokemonType.FIRE]: "Firium Z",
    [PokemonType.WATER]: "Waterium Z",
    [PokemonType.GRASS]: "Grassium Z",
    [PokemonType.ELECTRIC]: "Electrium Z",
    [PokemonType.PSYCHIC]: "Psychium Z",
    [PokemonType.ICE]: "Icium Z",
    [PokemonType.DRAGON]: "Dragonium Z",
    [PokemonType.DARK]: "Darkinium Z",
    [PokemonType.FAIRY]: "Fairium Z"
}