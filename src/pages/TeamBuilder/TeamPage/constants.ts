import {VersionGroup} from "../../../global/enums.ts";

export const VersionToGen: Record<VersionGroup, number> = {
    [VersionGroup.RED_BLUE]: 1,
    [VersionGroup.YELLOW]: 1,
    [VersionGroup.GOLD_SILVER]: 2,
    [VersionGroup.CRYSTAL]: 2,
    [VersionGroup.RUBY_SAPPHIRE]: 3,
    [VersionGroup.EMERALD]: 3,
    [VersionGroup.FIRERED_LEAFGREEN]: 3,
    [VersionGroup.DIAMOND_PEARL]: 4,
    [VersionGroup.PLATINUM]: 4,
    [VersionGroup.HEARTGOLD_SOULSILVER]: 4,
    [VersionGroup.BLACK_WHITE]: 5,
    [VersionGroup.BLACK_2_WHITE_2]: 5,
    [VersionGroup.X_Y]: 6,
    [VersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]: 6,
    [VersionGroup.SUN_MOON]: 7,
    [VersionGroup.ULTRA_SUN_ULTRA_MOON]: 7,
    [VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE]: 7,
    [VersionGroup.SWORD_SHIELD]: 8,
    [VersionGroup.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: 8,
    [VersionGroup.LEGENDS_ARCEUS]: 8,
    [VersionGroup.SCARLET_VIOLET]: 9
}