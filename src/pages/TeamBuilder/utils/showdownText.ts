import {PokemonType, VersionGroup} from "../../../global/enums.ts";
import {pokemonTypeLabel} from "../../../global/labels.ts";
import {PokemonTeamMember, StatKey, StatSpread, TeamCandidate, TeamCandidateSummary, TeamMove} from "../../../global/types.ts";
import {NATURES, NatureName} from "../../../global/data/natures.ts";
import {PLACEHOLDER_ITEMS} from "../../../global/data/items.ts";
import {GenRules} from "../genRules.ts";
import {createTeamMember} from "../createTeamMember.ts";
import {
    dvToShowdownIv, HIDDEN_POWER_MOVE_ID, hiddenPowerTypeFor,
    ivsForHiddenPower, showdownEvToStatExp, showdownIvToDv, statExpToShowdownEv,
    syncHiddenPowerMoveType,
} from "./stats.ts";

const STAT_ORDER: StatKey[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

// Verified against Pokemon Showdown's sim/dex-data.ts (DexStats): exportSet
// uses the module-level `Dex` singleton, not a format-scoped one, so these
// short names are what a real Showdown export shows for EVERY generation —
// there's no separate "Spc"/"[SpD]" gen-1 form to worry about on export. Import
// stays more lenient (see STAT_ALIASES) since hand-edited or older pastes do
// vary.
const SHOWDOWN_STAT_SHORT: Record<StatKey, string> = {hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

const STAT_ALIASES: Record<string, StatKey> = {
    hp: 'hp',
    atk: 'atk', attack: 'atk',
    def: 'def', defense: 'def',
    spa: 'spa', spatk: 'spa', spattack: 'spa', specialattack: 'spa', special: 'spa', spc: 'spa',
    spd: 'spd', spdef: 'spd', spdefense: 'spd', specialdefense: 'spd', specialdef: 'spd',
    spe: 'spe', speed: 'spe',
};

// Showdown's own parser special-cases the exact string "Spd" (capital S, not
// "SPD") to mean Speed rather than Special Defense — a documented quirk from
// old-style exports (sim/dex-data.ts's DexStats.getID). Checked before the
// general alias lookup so we accept the same pastes Showdown does.
function resolveStatShortName(raw: string): StatKey | undefined {
    if (raw === 'Spd') return 'spe';
    return STAT_ALIASES[raw.toLowerCase().replace(/[^a-z]/g, '')];
}

function resolveType(name: string): PokemonType | undefined {
    const target = name.trim().toLowerCase();
    return Object.values(PokemonType).find(t => t.toLowerCase() === target || pokemonTypeLabel[t].toLowerCase() === target);
}

function resolveNature(name: string): NatureName | undefined {
    const target = name.trim().toLowerCase();
    return (Object.keys(NATURES) as NatureName[]).find(key => key === target || NATURES[key].name.toLowerCase() === target);
}

// Items are a placeholder (see global/data/items.ts) covering ~20 well-known
// items, not the real dex — an unresolved item is silently skipped rather
// than treated as an import error, since most real Showdown pastes will name
// items we simply don't have yet.
function resolveItemSlug(name: string): string | undefined {
    const target = name.trim().toLowerCase();
    return PLACEHOLDER_ITEMS.find(i => i.name.toLowerCase() === target || i.slug === target)?.slug;
}

function resolveAbility(name: string, candidate: TeamCandidate) {
    const target = name.trim().toLowerCase();
    return candidate.abilities.find(a => a.name.toLowerCase() === target);
}

function resolveMove(name: string, candidate: TeamCandidate): TeamMove | undefined {
    const target = name.trim().toLowerCase();
    return candidate.moves.find(m => m.name.toLowerCase() === target);
}

interface SetHeader {
    speciesName: string;
    nickname: string | null;
    gender: 'M' | 'F' | null;
    itemName: string | null;
}

// Mirrors Showdown's parseExportedTeamLine's handling of a set's first line
// (sim/teams.ts): item after ' @ ', then a trailing ' (M)'/' (F)', then an
// optional "Nickname (Species)" wrapper.
function parseSetHeaderLine(line: string): SetHeader {
    let rest = line.trim();
    let itemName: string | null = null;

    const atParts = rest.split(' @ ');
    if (atParts.length > 1) {
        rest = atParts[0];
        itemName = atParts.slice(1).join(' @ ').trim();
        if (itemName.toLowerCase() === 'noitem') itemName = null;
    }

    let gender: 'M' | 'F' | null = null;
    if (rest.endsWith(' (M)')) {
        gender = 'M';
        rest = rest.slice(0, -4);
    } else if (rest.endsWith(' (F)')) {
        gender = 'F';
        rest = rest.slice(0, -4);
    }

    let nickname: string | null = null;
    let speciesName: string;
    if (rest.endsWith(')') && rest.includes('(')) {
        const openIndex = rest.indexOf('(');
        nickname = rest.slice(0, openIndex).trim();
        speciesName = rest.slice(openIndex + 1, -1).trim();
    } else {
        speciesName = rest.trim();
    }

    return {speciesName, nickname, gender, itemName};
}

// Sets in Showdown's multi-set format are separated by blank lines (Teams.export
// joins each exportSet's output, which already ends in a trailing newline, with
// another "\n" — see sim/teams.ts:367-373).
export function splitTeamText(text: string): string[] {
    return text.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);
}

// The first step of importing a block, done before any fetch: pull out just
// the species name so the caller can resolve it against the version group's
// candidate list and fetch that candidate's full detail (moves/abilities/
// stats) before handing the block to importSet.
export function parseSpeciesName(block: string): string {
    const firstLine = block.split('\n')[0] ?? '';
    return parseSetHeaderLine(firstLine).speciesName;
}

export function resolveSpecies(name: string, candidates: TeamCandidateSummary[]): TeamCandidateSummary | undefined {
    const target = name.trim().toLowerCase();
    return candidates.find(c => c.name.toLowerCase() === target);
}

export interface ImportResult {
    member: PokemonTeamMember | null;
    errors: string[];
}

// Parses one Showdown-format set block onto a member built from `candidate`
// (already resolved and fetched by the caller via resolveSpecies + the same
// fetch SetEditor uses) — id/type1/type2/gen/genderLock all come from
// createTeamMember, the same function the picker uses, never from the text.
export function importSet(block: string, candidate: TeamCandidate, versionGroup: VersionGroup | null, rules: GenRules): ImportResult {
    const errors: string[] = [];
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return {member: null, errors: ['Empty set.']};

    const header = parseSetHeaderLine(lines[0]);
    const member = createTeamMember(candidate, versionGroup);

    member.nickname = header.nickname && header.nickname !== candidate.name ? header.nickname : null;
    if (!member.genderLock) {
        if (header.gender === 'M') member.gender = 'male';
        else if (header.gender === 'F') member.gender = 'female';
    }
    if (header.itemName) {
        const slug = resolveItemSlug(header.itemName);
        if (slug) member.item = slug;
        // Unresolved item: left null rather than an error — see resolveItemSlug.
    }

    const evs: StatSpread = {...member.evs};
    const isDvModel = rules.ivModel === 'dv';
    let ivs: StatSpread = {...member.ivs};
    let ivsExplicit = false;
    let hpBracketType: PokemonType | null = null;

    for (const line of lines.slice(1)) {
        if (line.startsWith('Ability: ') || line.startsWith('Trait: ')) {
            const name = line.slice(line.indexOf(': ') + 2);
            const ability = resolveAbility(name, candidate);
            if (ability) member.ability = ability;
            else errors.push(`Ability "${name}" not found for ${candidate.name}.`);
        } else if (line === 'Shiny: Yes') {
            member.shiny = true;
        } else if (line.startsWith('Level: ')) {
            const level = parseInt(line.slice(7), 10);
            if (!isNaN(level)) member.level = Math.min(100, Math.max(1, level));
        } else if (line.startsWith('Happiness: ')) {
            const happiness = parseInt(line.slice(11), 10);
            if (!isNaN(happiness)) member.happiness = Math.min(255, Math.max(0, happiness));
        } else if (line.startsWith('Pokeball: ')) {
            member.pokeball = line.slice(10).trim();
        } else if (line.startsWith('Hidden Power: ')) {
            const type = resolveType(line.slice(14));
            if (type) hpBracketType = type;
            else errors.push(`Unknown Hidden Power type "${line.slice(14)}".`);
        } else if (line.startsWith('Dynamax Level: ')) {
            const dl = parseInt(line.slice(15), 10);
            if (!isNaN(dl)) member.dynamaxLevel = Math.min(10, Math.max(0, dl));
        } else if (line === 'Gigantamax: Yes') {
            member.gigantamax = true;
        } else if (line.startsWith('Tera Type: ')) {
            const type = resolveType(line.slice(11));
            if (type) member.teraType = type;
            else errors.push(`Unknown Tera Type "${line.slice(11)}".`);
        } else if (line.startsWith('EVs: ')) {
            for (const part of line.slice(5).split('/')) {
                const [valueStr, statName] = part.trim().split(' ');
                const stat = statName && resolveStatShortName(statName);
                const value = parseInt(valueStr, 10);
                if (!stat || isNaN(value)) continue;
                evs[stat] = rules.evModel === 'statExp' ? showdownEvToStatExp(value) : Math.min(rules.evCap, Math.max(0, value));
            }
        } else if (line.startsWith('IVs: ')) {
            ivsExplicit = true;
            const defaultIv = isDvModel ? 15 : 31;
            ivs = {hp: defaultIv, atk: defaultIv, def: defaultIv, spa: defaultIv, spd: defaultIv, spe: defaultIv};
            for (const part of line.slice(5).split('/')) {
                const [valueStr, statName] = part.trim().split(' ');
                const stat = statName && resolveStatShortName(statName);
                let value = parseInt(valueStr, 10);
                if (!stat) continue;
                if (isNaN(value)) value = 31;
                ivs[stat] = isDvModel ? showdownIvToDv(value) : Math.min(31, Math.max(0, value));
            }
        } else if (/^[A-Za-z]+ nature$/i.test(line)) {
            const name = line.slice(0, line.toLowerCase().lastIndexOf(' nature'));
            const nature = resolveNature(name);
            if (nature) member.nature = nature;
            else errors.push(`Unknown nature "${name}".`);
        } else if (line.startsWith('-') || line.startsWith('~')) {
            let moveText = line.slice(line.charAt(1) === ' ' ? 2 : 1).trim();
            const hpMatch = moveText.match(/^Hidden Power \[(.+)]$/i);
            if (hpMatch) {
                moveText = 'Hidden Power';
                const type = resolveType(hpMatch[1]);
                if (type) hpBracketType = type;
            }
            const move = resolveMove(moveText, candidate);
            if (!move) {
                errors.push(`Move "${moveText}" not learnable by ${candidate.name} in this format.`);
                continue;
            }
            const slotIndex = member.moves.findIndex(m => m === null);
            if (slotIndex === -1) {
                errors.push(`${candidate.name} already has 4 moves; ignoring extra move "${moveText}".`);
                continue;
            }
            member.moves[slotIndex] = {...move};
        }
    }

    // Mirrors Showdown's own fallback (team-validator.ts): if IVs weren't given
    // explicitly but a bracketed Hidden Power type was, derive IVs from that
    // type instead of leaving them at their all-max default.
    if (!ivsExplicit && hpBracketType) {
        ivs = ivsForHiddenPower(hpBracketType, rules.ivModel);
    }

    member.evs = evs;
    member.ivs = ivs;
    member.moves = syncHiddenPowerMoveType(member.moves, ivs, rules.ivModel);

    return {member, errors};
}

export function exportSet(member: PokemonTeamMember, rules: GenRules): string {
    let out = '';

    if (member.nickname && member.nickname !== member.name) {
        out += `${member.nickname} (${member.name})`;
    } else {
        out += member.name;
    }
    if (member.gender === 'male') out += ' (M)';
    if (member.gender === 'female') out += ' (F)';
    if (member.item) {
        const item = PLACEHOLDER_ITEMS.find(i => i.slug === member.item);
        if (item) out += ` @ ${item.name}`;
    }
    out += '  \n';

    if (member.ability) out += `Ability: ${member.ability.name}  \n`;
    if (member.level !== 100) out += `Level: ${member.level}  \n`;
    if (member.shiny) out += `Shiny: Yes  \n`;
    if (member.happiness !== 255) out += `Happiness: ${member.happiness}  \n`;
    if (rules.pokeball && member.pokeball) out += `Pokeball: ${member.pokeball}  \n`;
    if (rules.hiddenPower) {
        out += `Hidden Power: ${pokemonTypeLabel[hiddenPowerTypeFor(member.ivs, rules.ivModel)]}  \n`;
    }
    if (member.dynamaxLevel !== 10) out += `Dynamax Level: ${member.dynamaxLevel}  \n`;
    if (member.gigantamax) out += `Gigantamax: Yes  \n`;
    if (member.teraType) out += `Tera Type: ${pokemonTypeLabel[member.teraType]}  \n`;

    const evParts = STAT_ORDER
        .map(stat => {
            const raw = member.evs[stat];
            if (!raw) return null;
            const value = rules.evModel === 'statExp' ? statExpToShowdownEv(raw) : raw;
            return value ? `${value} ${SHOWDOWN_STAT_SHORT[stat]}` : null;
        })
        .filter((s): s is string => s !== null);
    if (evParts.length) out += `EVs: ${evParts.join(' / ')}  \n`;

    out += `${NATURES[member.nature].name} Nature  \n`;

    const defaultIv = rules.ivModel === 'dv' ? 15 : 31;
    const ivParts = STAT_ORDER
        .map(stat => {
            const raw = member.ivs[stat];
            if (raw === defaultIv) return null;
            const value = rules.ivModel === 'dv' ? dvToShowdownIv(raw) : raw;
            return `${value} ${SHOWDOWN_STAT_SHORT[stat]}`;
        })
        .filter((s): s is string => s !== null);
    if (ivParts.length) out += `IVs: ${ivParts.join(' / ')}  \n`;

    for (const move of member.moves) {
        if (!move) continue;
        out += move.id === HIDDEN_POWER_MOVE_ID
            ? `- Hidden Power [${pokemonTypeLabel[move.type]}]  \n`
            : `- ${move.name}  \n`;
    }

    return out;
}

export function exportTeam(members: PokemonTeamMember[], rules: GenRules): string {
    return members.map(member => exportSet(member, rules)).join('\n');
}
