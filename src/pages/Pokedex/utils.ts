import {PokedexRegion} from "../../global/enums.ts";
import {PokedexVersion} from "./enums.ts";

export const VersionToRegion: Record<PokedexVersion, PokedexRegion[]> = {
    [PokedexVersion.RED_BLUE_YELLOW]: [
        PokedexRegion.KANTO
    ],
    [PokedexVersion.GOLD_SILVER_CRYSTAL]: [
        PokedexRegion.ORIGINAL_JOHTO
    ],
    [PokedexVersion.RUBY_SAPPHIRE_EMERALD]: [
        PokedexRegion.HOENN
    ],
    [PokedexVersion.FIRERED_LEAFGREEN]: [
        PokedexRegion.KANTO
    ],
    [PokedexVersion.DIAMOND_PEARL_PLATINUM]: [
        PokedexRegion.EXTENDED_SINNOH
    ],
    [PokedexVersion.HEARTGOLD_SOULSILVER]: [
        PokedexRegion.UPDATED_JOHTO
    ],
    [PokedexVersion.BLACK_WHITE]: [
        PokedexRegion.ORIGINAL_UNOVA
    ],
    [PokedexVersion.BLACK_2_WHITE_2]: [
        PokedexRegion.UPDATED_UNOVA
    ],
    [PokedexVersion.X_Y]: [
        PokedexRegion.KALOS_CENTRAL,
        PokedexRegion.KALOS_COASTAL,
        PokedexRegion.KALOS_MOUNTAIN
    ],
    [PokedexVersion.OMEGA_RUBY_ALPHA_SAPPHIRE]: [
        PokedexRegion.UPDATED_HOENN
    ],
    [PokedexVersion.SUN_MOON]: [
        PokedexRegion.ORIGINAL_ALOLA,
        PokedexRegion.ORIGINAL_MELEMELE,
        PokedexRegion.ORIGINAL_AKALA,
        PokedexRegion.ORIGINAL_ULAULA,
        PokedexRegion.ORIGINAL_PONI
    ],
    [PokedexVersion.ULTRA_SUN_ULTRA_MOON]: [
        PokedexRegion.UPDATED_ALOLA,
        PokedexRegion.UPDATED_MELEMELE,
        PokedexRegion.UPDATED_AKALA,
        PokedexRegion.UPDATED_ULAULA,
        PokedexRegion.UPDATED_PONI
    ],
    [PokedexVersion.LETS_GO_PIKACHU_LETS_GO_EEVEE]: [
        PokedexRegion.LETSGO_KANTO
    ],
    [PokedexVersion.SWORD_SHIELD]: [
        PokedexRegion.GALAR,
        PokedexRegion.ISLE_OF_ARMOR,
        PokedexRegion.CROWN_TUNDRA
    ],
    [PokedexVersion.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: [
        PokedexRegion.ORIGINAL_SINNOH
    ],
    [PokedexVersion.LEGENDS_ARCEUS]: [
        PokedexRegion.HISUI
    ],
    [PokedexVersion.SCARLET_VIOLET]: [
        PokedexRegion.PALDEA,
        PokedexRegion.KITAKAMI,
        PokedexRegion.BLUEBERRY
    ]
};


export const VersionToImage: Record<PokedexVersion, string> = {
    [PokedexVersion.RED_BLUE_YELLOW]: "rby.png",
    [PokedexVersion.GOLD_SILVER_CRYSTAL]: "gsc.png",
    [PokedexVersion.RUBY_SAPPHIRE_EMERALD]: "rse.png",
    [PokedexVersion.FIRERED_LEAFGREEN]: "frlg.png",
    [PokedexVersion.DIAMOND_PEARL_PLATINUM]: "dppt.png",
    [PokedexVersion.HEARTGOLD_SOULSILVER]: "hgss.png",
    [PokedexVersion.BLACK_WHITE]: "bw.png",
    [PokedexVersion.BLACK_2_WHITE_2]: "b2w2.png",
    [PokedexVersion.X_Y]: "xy.png",
    [PokedexVersion.OMEGA_RUBY_ALPHA_SAPPHIRE]: "oras.png",
    [PokedexVersion.SUN_MOON]: "sm.png",
    [PokedexVersion.ULTRA_SUN_ULTRA_MOON]: "usum.png",
    [PokedexVersion.LETS_GO_PIKACHU_LETS_GO_EEVEE]: "lgpe.png",
    [PokedexVersion.SWORD_SHIELD]: "swsh.png",
    [PokedexVersion.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: "bdsp.png",
    [PokedexVersion.LEGENDS_ARCEUS]: "arceus.png",
    [PokedexVersion.SCARLET_VIOLET]: "sv.png"
};
