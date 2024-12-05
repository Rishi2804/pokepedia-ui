import {VersionGroup, PokedexRegion} from "../../../global/enums.ts";

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