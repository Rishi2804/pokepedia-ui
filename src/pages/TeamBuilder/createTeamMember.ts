import {PokemonTeamMember, StatSpread, TeamCandidateSummary} from "../../global/types.ts";
import {VersionGroup} from "../../global/enums.ts";
import {getGenRules} from "./genRules.ts";

const zeroSpread = (): StatSpread => ({hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0});
const maxIvSpread = (value: number): StatSpread => ({hp: value, atk: value, def: value, spa: value, spd: value, spe: value});

// Builds a fresh set from just the list-endpoint summary, so adding a Pokemon
// from the picker never has to wait on the single-candidate fetch. Defaults
// are gen-appropriate (e.g. DVs default to 15 pre-gen-3, IVs to 31 from gen 3
// on) but otherwise as neutral as Showdown's own new-set defaults.
export function createTeamMember(candidate: TeamCandidateSummary, versionGroup: VersionGroup | null): PokemonTeamMember {
    const rules = getGenRules(versionGroup);

    return {
        id: candidate.id,
        name: candidate.name,
        type1: candidate.type1,
        type2: candidate.type2,
        gen: candidate.gen,

        nickname: null,
        shiny: false,
        gender: candidate.genderRate < 0 ? 'genderless' : candidate.genderRate > 4 ? 'female' : 'male',
        genderLock: candidate.genderRate === -1 || candidate.genderRate === 0 || candidate.genderRate === 8,
        ability: null,
        moves: [null, null, null, null],
        level: 100,
        nature: 'serious',
        item: null,
        evs: zeroSpread(),
        ivs: maxIvSpread(rules.ivModel === 'dv' ? 15 : 31),
        happiness: 255,
        pokeball: 'Poké Ball',
        dynamaxLevel: 10,
        gigantamax: false,
    };
}
