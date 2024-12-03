import {IAbilitySnapshot} from "../types.ts";
import {AbilitySnapshot} from "../../../global/types.ts";

export function prepareForUI(abilities: IAbilitySnapshot[]): AbilitySnapshot[][] {
    const genSeperated: AbilitySnapshot[][] = new Array(7).fill([]).map(() => []);
    abilities.forEach(ability => {
        genSeperated[ability.gen-3].push(ability)
    })
    return genSeperated
}