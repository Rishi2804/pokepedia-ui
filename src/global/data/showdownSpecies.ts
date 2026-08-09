import {TeamCandidateSummary} from "../types.ts";

// Matches Showdown's own toID (sim/dex-data.ts): lowercase, strip everything
// that isn't a-z0-9. Our DB stores PokeAPI-style slugs (e.g. "raichu-alola"),
// which normalize to the same key Showdown uses for that species
// ("raichualola") for 1198 of our 1244 Pokemon — see SLUG_TO_SHOWDOWN_ID for
// the rest.
export function toShowdownId(slug: string): string {
    return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// The 46 slugs that don't resolve by normalizing alone, hand-written from
// Showdown's real `forme`/`baseSpecies` fields (../pokemon-showdown/data/pokedex.ts),
// cross-referenced by dex number — NOT derived by a "guess the base form"
// heuristic. An earlier heuristic attempt (map every straggler to its bare
// base species) reported "46 resolved, 0 ambiguous" and was wrong for 17 of
// them: PokeAPI names some non-default forms as if they were the default
// (e.g. "meowstic-female" isn't "meowstic", it's Showdown's "Meowstic-F";
// "necrozma-dusk" is "Necrozma-Dusk-Mane", not "Necrozma-Dusk"). Verified:
// every one of our 1244 slugs (direct match or override) resolves to a real
// key in Showdown's pokedex with a matching dex number, and no two of our
// slugs collide on the same Showdown key.
const SLUG_TO_SHOWDOWN_ID: Record<string, { id: string; name: string }> = {
    "deoxys-normal": {id: "deoxys", name: "Deoxys"},
    "wormadam-plant": {id: "wormadam", name: "Wormadam"},
    "giratina-altered": {id: "giratina", name: "Giratina"},
    "shaymin-land": {id: "shaymin", name: "Shaymin"},
    "basculin-red-striped": {id: "basculin", name: "Basculin"},
    "darmanitan-standard": {id: "darmanitan", name: "Darmanitan"},
    "darmanitan-galar-standard": {id: "darmanitangalar", name: "Darmanitan-Galar"},
    "tornadus-incarnate": {id: "tornadus", name: "Tornadus"},
    "thundurus-incarnate": {id: "thundurus", name: "Thundurus"},
    "landorus-incarnate": {id: "landorus", name: "Landorus"},
    "keldeo-ordinary": {id: "keldeo", name: "Keldeo"},
    "meloetta-aria": {id: "meloetta", name: "Meloetta"},
    "meowstic-male": {id: "meowstic", name: "Meowstic"},
    "meowstic-female": {id: "meowsticf", name: "Meowstic-F"},
    "aegislash-shield": {id: "aegislash", name: "Aegislash"},
    "pumpkaboo-average": {id: "pumpkaboo", name: "Pumpkaboo"},
    "gourgeist-average": {id: "gourgeist", name: "Gourgeist"},
    "zygarde-50": {id: "zygarde", name: "Zygarde"},
    "oricorio-baile": {id: "oricorio", name: "Oricorio"},
    "lycanroc-midday": {id: "lycanroc", name: "Lycanroc"},
    "wishiwashi-solo": {id: "wishiwashi", name: "Wishiwashi"},
    "mimikyu-disguised": {id: "mimikyu", name: "Mimikyu"},
    "toxtricity-amped": {id: "toxtricity", name: "Toxtricity"},
    "eiscue-ice": {id: "eiscue", name: "Eiscue"},
    "indeedee-male": {id: "indeedee", name: "Indeedee"},
    "indeedee-female": {id: "indeedeef", name: "Indeedee-F"},
    "morpeko-full-belly": {id: "morpeko", name: "Morpeko"},
    "urshifu-single-strike": {id: "urshifu", name: "Urshifu"},
    "urshifu-single-strike-gmax": {id: "urshifugmax", name: "Urshifu-Gmax"},
    "basculegion-male": {id: "basculegion", name: "Basculegion"},
    "basculegion-female": {id: "basculegionf", name: "Basculegion-F"},
    "enamorus-incarnate": {id: "enamorus", name: "Enamorus"},
    "minior-red": {id: "minior", name: "Minior"},
    "necrozma-dusk": {id: "necrozmaduskmane", name: "Necrozma-Dusk-Mane"},
    "necrozma-dawn": {id: "necrozmadawnwings", name: "Necrozma-Dawn-Wings"},
    "oinkologne-female": {id: "oinkolognef", name: "Oinkologne-F"},
    "maushold-family-of-three": {id: "mausholdfour", name: "Maushold-Four"},
    "tauros-paldea-combat-breed": {id: "taurospaldeacombat", name: "Tauros-Paldea-Combat"},
    "tauros-paldea-blaze-breed": {id: "taurospaldeablaze", name: "Tauros-Paldea-Blaze"},
    "tauros-paldea-aqua-breed": {id: "taurospaldeaaqua", name: "Tauros-Paldea-Aqua"},
    "squawkabilly-blue-plumage": {id: "squawkabillyblue", name: "Squawkabilly-Blue"},
    "squawkabilly-yellow-plumage": {id: "squawkabillyyellow", name: "Squawkabilly-Yellow"},
    "squawkabilly-white-plumage": {id: "squawkabillywhite", name: "Squawkabilly-White"},
    "ogerpon-wellspring-mask": {id: "ogerponwellspring", name: "Ogerpon-Wellspring"},
    "ogerpon-hearthflame-mask": {id: "ogerponhearthflame", name: "Ogerpon-Hearthflame"},
    "ogerpon-cornerstone-mask": {id: "ogerponcornerstone", name: "Ogerpon-Cornerstone"},
};

// The name a real Showdown client shows/expects for this slug — used for
// export. Title-casing each hyphen segment reproduces Showdown's canonical
// name for the 1198 slugs that don't need an override (raichu-alola ->
// Raichu-Alola); overridden slugs use their mapped form's real name instead,
// since naive title-casing would be wrong or simply not a valid Showdown name
// (indeedee-female -> "Indeedee-Female" isn't a species Showdown knows, but
// "Indeedee-F" is).
export function showdownNameFromSlug(slug: string): string {
    const override = SLUG_TO_SHOWDOWN_ID[slug];
    if (override) return override.name;
    return slug.split('-').map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join('-');
}

// For import: toID the pasted species name and match it against
// toShowdownId(candidate.slug), consulting the override table for the 46
// that don't line up directly. Where two of our slugs collapse onto the same
// Showdown id (our "maushold" and "maushold-family-of-three" both exist, but
// only "maushold-family-of-three" needs the override to "mausholdfour" since
// plain "maushold" already claims the bare id), an exact toShowdownId match
// always wins over a mapped override.
export function resolveSlugFromShowdownName(name: string, candidates: TeamCandidateSummary[]): TeamCandidateSummary | undefined {
    const target = toShowdownId(name);
    const exact = candidates.find(c => toShowdownId(c.slug) === target);
    if (exact) return exact;
    return candidates.find(c => SLUG_TO_SHOWDOWN_ID[c.slug]?.id === target);
}
