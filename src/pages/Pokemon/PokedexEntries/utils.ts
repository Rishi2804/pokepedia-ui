import {Game, PokedexRegion} from "../../../global/enums.ts";
import {IDexEntry, IDexNum} from "./types.ts";
import {DexToRegionMapping} from "./constants.ts";
import {formatText} from "../../../global/utils.ts";

export function categorizedDexEntries(gen: number, dexEntries: IDexEntry[], dexNumbers: IDexNum[]) {
    const categories = []
    if (gen <= 1) {
        categories.push({
            games: [Game.RED, Game.BLUE, Game.YELLOW],
            dexes: [PokedexRegion.KANTO],
            gen: 1
        })
    }
    if (gen <= 2) {
        categories.push({
            games: [Game.GOLD, Game.SILVER, Game.CRYSTAL],
            dexes: [PokedexRegion.ORIGINAL_JOHTO],
            gen: 2
        })
    }
    if (gen <= 3) {
        categories.push({
            games: [Game.RUBY, Game.SAPPHIRE, Game.EMERALD, Game.FIRERED, Game.LEAFGREEN],
            dexes: [PokedexRegion.HOENN, PokedexRegion.KANTO],
            gen: 3
        })
    }
    if (gen <= 4) {
        categories.push({
            games: [Game.DIAMOND, Game.PEARL, Game.PLATINUM, Game.HEARTGOLD, Game.SOULSILVER],
            dexes: [PokedexRegion.ORIGINAL_SINNOH, PokedexRegion.EXTENDED_SINNOH, PokedexRegion.UPDATED_JOHTO],
            gen: 4
        })
    }
    if (gen <= 5) {
        categories.push({
            games: [Game.BLACK, Game.WHITE, Game.BLACK_2, Game.WHITE_2],
            dexes: [PokedexRegion.ORIGINAL_UNOVA, PokedexRegion.UPDATED_UNOVA],
            gen: 5
        })
    }
    if (gen <= 6) {
        categories.push({
            games: [Game.X, Game.Y, Game.OMEGA_RUBY, Game.ALPHA_SAPPHIRE],
            dexes: [PokedexRegion.KALOS_CENTRAL, PokedexRegion.KALOS_COASTAL, PokedexRegion.KALOS_MOUNTAIN, PokedexRegion.UPDATED_HOENN],
            gen: 6
        })
    }
    if (gen <= 7) {
        categories.push({
            games: [Game.SUN, Game.MOON, Game.ULTRA_SUN, Game.ULTRA_MOON, Game.LETS_GO_PIKACHU, Game.LETS_GO_EEVEE],
            dexes: [PokedexRegion.ORIGINAL_ALOLA, PokedexRegion.UPDATED_ALOLA, PokedexRegion.LETSGO_KANTO],
            gen: 7
        })
    }
    if (gen <= 8) {
        categories.push({
            games: [Game.SWORD, Game.SHIELD, Game.BRILLIANT_DIAMOND, Game.SHINING_PEARL, Game.LEGENDS_ARCEUS],
            dexes: [PokedexRegion.GALAR, PokedexRegion.ISLE_OF_ARMOR, PokedexRegion.CROWN_TUNDRA, PokedexRegion.ORIGINAL_SINNOH, PokedexRegion.HISUI],
            gen: 8
        })
    }
    if (gen <= 9) {
        categories.push({
            games: [Game.SCARLET, Game.VIOLET],
            dexes: [PokedexRegion.PALDEA, PokedexRegion.KITAKAMI, PokedexRegion.BLUEBERRY],
            gen: 9
        })
    }

    return categories.map((category) => {
        const revelvantDexEntries = dexEntries.filter((entry) => category.games.includes(entry.game))

        let relevantDexNums = category.dexes.map((dex) => {
            const num = dexNumbers.find((entry) => entry.dexName === dex)
            if (num) {
                if (num.dexName.split('-').includes('kalos')) {
                    return {name: formatText(num.dexName), number: num.dexNumber}
                } else {
                    return {name: DexToRegionMapping[num.dexName], number: num.dexNumber}
                }
            } else {
                return {name: DexToRegionMapping[dex], number: null}
            }
        })

        if (category.gen === 6) {
            if (!(relevantDexNums[0].number || relevantDexNums[1].number || relevantDexNums[2].number)) {
                relevantDexNums.splice(0, 3, {name: 'Kalos', number: null})
            } else {
                relevantDexNums = relevantDexNums.filter((dexNum, index) => (index >= 3 || dexNum.number))
            }
        } else if (category.gen === 4 || category.gen === 5 || category.gen === 7) {
            if (relevantDexNums[0].number === relevantDexNums[1].number) {
                relevantDexNums.splice(1, 1)
            } else {
                if (category.gen === 5) {
                    relevantDexNums[0].name += ' BW'
                    relevantDexNums[1].name += ' B2W2'
                } else if (category.gen === 7) {
                    relevantDexNums[0].name += ' SM'
                    relevantDexNums[1].name += ' USUM'
                }
                relevantDexNums = relevantDexNums.filter((dexNum, index) => (index >= 2 || dexNum.number))
            }
        } else if (category.gen === 8) {
            if (!(relevantDexNums[0].number || relevantDexNums[1].number || relevantDexNums[2].number)) {
                relevantDexNums.splice(1, 2)
            } else {
                relevantDexNums = relevantDexNums.filter((dexNum, index) => (index >= 3 || dexNum.number))
            }
        }

        return {entries: revelvantDexEntries, numbers: relevantDexNums}
    })
}