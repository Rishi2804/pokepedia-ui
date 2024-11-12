import {PokedexRegion, PokemonType, VersionGroup} from "./enums.ts";

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

export const VersionToRegion: Record<VersionGroup, PokedexRegion[]> = {
    [VersionGroup.RED_BLUE]: [
        PokedexRegion.KANTO
    ],
    [VersionGroup.YELLOW]: [
        PokedexRegion.KANTO
    ],
    [VersionGroup.GOLD_SILVER]: [
        PokedexRegion.ORIGINAL_JOHTO
    ],
    [VersionGroup.CRYSTAL]: [
        PokedexRegion.ORIGINAL_JOHTO
    ],
    [VersionGroup.RUBY_SAPPHIRE]: [
        PokedexRegion.HOENN
    ],
    [VersionGroup.EMERALD]: [
        PokedexRegion.HOENN
    ],
    [VersionGroup.FIRERED_LEAFGREEN]: [
        PokedexRegion.KANTO
    ],
    [VersionGroup.DIAMOND_PEARL]: [
        PokedexRegion.ORIGINAL_SINNOH
    ],
    [VersionGroup.PLATINUM]: [
        PokedexRegion.EXTENDED_SINNOH
    ],
    [VersionGroup.HEARTGOLD_SOULSILVER]: [
        PokedexRegion.UPDATED_JOHTO
    ],
    [VersionGroup.BLACK_WHITE]: [
        PokedexRegion.ORIGINAL_UNOVA
    ],
    [VersionGroup.BLACK_2_WHITE_2]: [
        PokedexRegion.UPDATED_UNOVA
    ],
    [VersionGroup.X_Y]: [
        PokedexRegion.KALOS_CENTRAL,
        PokedexRegion.KALOS_COASTAL,
        PokedexRegion.KALOS_MOUNTAIN
    ],
    [VersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]: [
        PokedexRegion.UPDATED_HOENN
    ],
    [VersionGroup.SUN_MOON]: [
        PokedexRegion.ORIGINAL_ALOLA,
        PokedexRegion.ORIGINAL_MELEMELE,
        PokedexRegion.ORIGINAL_AKALA,
        PokedexRegion.ORIGINAL_ULAULA,
        PokedexRegion.ORIGINAL_PONI
    ],
    [VersionGroup.ULTRA_SUN_ULTRA_MOON]: [
        PokedexRegion.UPDATED_ALOLA,
        PokedexRegion.UPDATED_MELEMELE,
        PokedexRegion.UPDATED_AKALA,
        PokedexRegion.UPDATED_ULAULA,
        PokedexRegion.UPDATED_PONI
    ],
    [VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE]: [
        PokedexRegion.LETSGO_KANTO
    ],
    [VersionGroup.SWORD_SHIELD]: [
        PokedexRegion.GALAR,
        PokedexRegion.ISLE_OF_ARMOR,
        PokedexRegion.CROWN_TUNDRA
    ],
    [VersionGroup.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: [
        PokedexRegion.ORIGINAL_SINNOH
    ],
    [VersionGroup.LEGENDS_ARCEUS]: [
        PokedexRegion.HISUI
    ],
    [VersionGroup.SCARLET_VIOLET]: [
        PokedexRegion.PALDEA,
        PokedexRegion.KITAKAMI,
        PokedexRegion.BLUEBERRY
    ]
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export const VersionToImage: Record<VersionGroup, string> = {
    [VersionGroup.RED_BLUE]: "rby.png",
    [VersionGroup.GOLD_SILVER]: "gsc.png",
    [VersionGroup.RUBY_SAPPHIRE]: "rse.png",
    [VersionGroup.FIRERED_LEAFGREEN]: "frlg.png",
    [VersionGroup.DIAMOND_PEARL]: "dppt.png",
    [VersionGroup.PLATINUM]: "dppt.png",
    [VersionGroup.HEARTGOLD_SOULSILVER]: "hgss.png",
    [VersionGroup.BLACK_WHITE]: "bw.png",
    [VersionGroup.BLACK_2_WHITE_2]: "b2w2.png",
    [VersionGroup.X_Y]: "xy.png",
    [VersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]: "oras.png",
    [VersionGroup.SUN_MOON]: "sm.png",
    [VersionGroup.ULTRA_SUN_ULTRA_MOON]: "usum.png",
    [VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE]: "lgpe.png",
    [VersionGroup.SWORD_SHIELD]: "swsh.png",
    [VersionGroup.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: "bdsp.png",
    [VersionGroup.LEGENDS_ARCEUS]: "arceus.png",
    [VersionGroup.SCARLET_VIOLET]: "sv.png"
};

export function getFormattedVersion(key: VersionGroup): string {
    if (key === VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE) return "lets-go-pikachu-eevee"
    if (key === VersionGroup.RED_BLUE) return "red-blue-yellow"
    if (key === VersionGroup.GOLD_SILVER) return "gold-silver-crystal"
    if (key === VersionGroup.RUBY_SAPPHIRE) return "ruby-sapphire-emerald"

    return key
        .replace(/_/g, ' ')            // Replace underscores with spaces
        .toLowerCase()                // Convert to lowercase
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/\//g, '-')          // Replace slashes with hyphens
        .replace(/:/g, '');             // Remove colons
}