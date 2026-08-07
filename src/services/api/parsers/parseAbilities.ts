import {AbilitySnapshot} from "../../../global/types.ts";
import {groupByGen} from "./shared.ts";

export function parseAbilities(json: unknown): AbilitySnapshot[][] {
    const abilities = json as AbilitySnapshot[];
    return groupByGen(abilities, 3, 7);
}
