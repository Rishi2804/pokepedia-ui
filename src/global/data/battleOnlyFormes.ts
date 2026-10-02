export interface BattleOnlyForme {
    /** Showdown display name(s) to revert to. >1 element only for the two
     *  known ambiguous cases (Necrozma-Ultra, Zygarde-Complete/-Mega) - the
     *  first is used as the default; see resolveBattleOnlyBase's doc comment
     *  in showdownSpecies.ts. */
    baseNames: string[];
    /** Present only when reaching this forme requires holding a specific
     *  item (Mega Stones, Primal Orbs, Rusted Sword/Shield, Ultranecrozium Z,
     *  Ogerpon's masks). Absent for ability/move/condition-gated formes
     *  (Zen Darmanitan, Ash-Greninja, ...) - those just redirect to
     *  their base species with no item handling. */
    requiredItem?: {slug: string; name: string};
    /** Set on Gmax formes: the base species is submitted with
     *  `gigantamax: true` instead of an item, the way a Mega submits its
     *  Mega Stone. */
    gigantamax?: true;
}

// Generated from @pkmn/sim's gen-9 Dex (every species where .battleOnly is
// set - Showdown's own marker for "this forme can never be submitted
// directly, only reached via in-battle transformation" - sim/dex-species.ts
// derives it for Mega/Primal formes even when the raw pokedex data has no
// literal battleOnly field). Regenerate via:
//
//   cd pokepedia-battle && node -e "
//     const {Dex} = require('@pkmn/sim');
//     const gen = Dex.forGen(9);
//     for (const species of gen.species.all()) {
//       const isGmax = species.forme.includes('Gmax');
//       if (!species.battleOnly && !isGmax) continue;
//       // Gmax formes only carry changesFrom, not battleOnly (except the two
//       // alt-forme ones); they get `gigantamax: true` appended by hand.
//       const bo = species.battleOnly || species.changesFrom;
//       const baseNames = Array.isArray(bo) ? bo : [bo];
//       const reqId = species.requiredItem || (species.requiredItems && species.requiredItems[0]);
//       const requiredItem = reqId ? {slug: gen.items.get(reqId).id, name: gen.items.get(reqId).name} : null;
//       console.log(species.id, JSON.stringify({baseNames, requiredItem}));
//     }"
//
// if this fork's vendored Showdown data ever adds a new custom battle-only
// forme (it already has ~90 non-canon Megas beyond the vanilla roster).
// Keyed by Showdown id, so a lookup is just toShowdownId(candidate.slug) or
// toShowdownId(a raw pasted Showdown name) - see resolveBattleOnlyBase.
export const BATTLE_ONLY_FORMES: Record<string, BattleOnlyForme> = {
    abomasnowmega: {baseNames: ['Abomasnow'], requiredItem: {slug: 'abomasite', name: 'Abomasite'}},
    absolmega: {baseNames: ['Absol'], requiredItem: {slug: 'absolite', name: 'Absolite'}},
    aegislashblade: {baseNames: ['Aegislash']},
    aerodactylmega: {baseNames: ['Aerodactyl'], requiredItem: {slug: 'aerodactylite', name: 'Aerodactylite'}},
    aggronmega: {baseNames: ['Aggron'], requiredItem: {slug: 'aggronite', name: 'Aggronite'}},
    alakazammega: {baseNames: ['Alakazam'], requiredItem: {slug: 'alakazite', name: 'Alakazite'}},
    alcremiegmax: {baseNames: ['Alcremie'], gigantamax: true},
    altariamega: {baseNames: ['Altaria'], requiredItem: {slug: 'altarianite', name: 'Altarianite'}},
    ampharosmega: {baseNames: ['Ampharos'], requiredItem: {slug: 'ampharosite', name: 'Ampharosite'}},
    appletungmax: {baseNames: ['Appletun'], gigantamax: true},
    audinomega: {baseNames: ['Audino'], requiredItem: {slug: 'audinite', name: 'Audinite'}},
    banettemega: {baseNames: ['Banette'], requiredItem: {slug: 'banettite', name: 'Banettite'}},
    barbaraclemega: {baseNames: ['Barbaracle'], requiredItem: {slug: 'barbaracite', name: 'Barbaracite'}},
    baxcaliburmega: {baseNames: ['Baxcalibur'], requiredItem: {slug: 'baxcalibrite', name: 'Baxcalibrite'}},
    beedrillmega: {baseNames: ['Beedrill'], requiredItem: {slug: 'beedrillite', name: 'Beedrillite'}},
    blastoisegmax: {baseNames: ['Blastoise'], gigantamax: true},
    blastoisemega: {baseNames: ['Blastoise'], requiredItem: {slug: 'blastoisinite', name: 'Blastoisinite'}},
    blazikenmega: {baseNames: ['Blaziken'], requiredItem: {slug: 'blazikenite', name: 'Blazikenite'}},
    butterfreegmax: {baseNames: ['Butterfree'], gigantamax: true},
    cameruptmega: {baseNames: ['Camerupt'], requiredItem: {slug: 'cameruptite', name: 'Cameruptite'}},
    castformrainy: {baseNames: ['Castform']},
    castformsnowy: {baseNames: ['Castform']},
    castformsunny: {baseNames: ['Castform']},
    centiskorchgmax: {baseNames: ['Centiskorch'], gigantamax: true},
    chandeluremega: {baseNames: ['Chandelure'], requiredItem: {slug: 'chandelurite', name: 'Chandelurite'}},
    charizardgmax: {baseNames: ['Charizard'], gigantamax: true},
    charizardmegax: {baseNames: ['Charizard'], requiredItem: {slug: 'charizarditex', name: 'Charizardite X'}},
    charizardmegay: {baseNames: ['Charizard'], requiredItem: {slug: 'charizarditey', name: 'Charizardite Y'}},
    cherrimsunshine: {baseNames: ['Cherrim']},
    chesnaughtmega: {baseNames: ['Chesnaught'], requiredItem: {slug: 'chesnaughtite', name: 'Chesnaughtite'}},
    chimechomega: {baseNames: ['Chimecho'], requiredItem: {slug: 'chimechite', name: 'Chimechite'}},
    cinderacegmax: {baseNames: ['Cinderace'], gigantamax: true},
    clefablemega: {baseNames: ['Clefable'], requiredItem: {slug: 'clefablite', name: 'Clefablite'}},
    coalossalgmax: {baseNames: ['Coalossal'], gigantamax: true},
    copperajahgmax: {baseNames: ['Copperajah'], gigantamax: true},
    corviknightgmax: {baseNames: ['Corviknight'], gigantamax: true},
    crabominablemega: {baseNames: ['Crabominable'], requiredItem: {slug: 'crabominite', name: 'Crabominite'}},
    cramorantgorging: {baseNames: ['Cramorant']},
    cramorantgulping: {baseNames: ['Cramorant']},
    crucibellemega: {baseNames: ['Crucibelle'], requiredItem: {slug: 'crucibellite', name: 'Crucibellite'}},
    darkraimega: {baseNames: ['Darkrai'], requiredItem: {slug: 'darkranite', name: 'Darkranite'}},
    darmanitangalarzen: {baseNames: ['Darmanitan-Galar']},
    darmanitanzen: {baseNames: ['Darmanitan']},
    delphoxmega: {baseNames: ['Delphox'], requiredItem: {slug: 'delphoxite', name: 'Delphoxite'}},
    dianciemega: {baseNames: ['Diancie'], requiredItem: {slug: 'diancite', name: 'Diancite'}},
    dragalgemega: {baseNames: ['Dragalge'], requiredItem: {slug: 'dragalgite', name: 'Dragalgite'}},
    dragonitemega: {baseNames: ['Dragonite'], requiredItem: {slug: 'dragoninite', name: 'Dragoninite'}},
    drampamega: {baseNames: ['Drampa'], requiredItem: {slug: 'drampanite', name: 'Drampanite'}},
    drednawgmax: {baseNames: ['Drednaw'], gigantamax: true},
    duraludongmax: {baseNames: ['Duraludon'], gigantamax: true},
    eelektrossmega: {baseNames: ['Eelektross'], requiredItem: {slug: 'eelektrossite', name: 'Eelektrossite'}},
    eeveegmax: {baseNames: ['Eevee'], gigantamax: true},
    eiscuenoice: {baseNames: ['Eiscue']},
    emboarmega: {baseNames: ['Emboar'], requiredItem: {slug: 'emboarite', name: 'Emboarite'}},
    excadrillmega: {baseNames: ['Excadrill'], requiredItem: {slug: 'excadrite', name: 'Excadrite'}},
    falinksmega: {baseNames: ['Falinks'], requiredItem: {slug: 'falinksite', name: 'Falinksite'}},
    feraligatrmega: {baseNames: ['Feraligatr'], requiredItem: {slug: 'feraligite', name: 'Feraligite'}},
    flapplegmax: {baseNames: ['Flapple'], gigantamax: true},
    // Showdown's own battleOnly for this points at "Floette-Eternal", but
    // that forme is itself unreachable in this format (not unbanned by
    // +Future) - verified empirically that plain "Floette" holding
    // Floettite validates instead.
    floettemega: {baseNames: ['Floette'], requiredItem: {slug: 'floettite', name: 'Floettite'}},
    froslassmega: {baseNames: ['Froslass'], requiredItem: {slug: 'froslassite', name: 'Froslassite'}},
    gallademega: {baseNames: ['Gallade'], requiredItem: {slug: 'galladite', name: 'Galladite'}},
    garbodorgmax: {baseNames: ['Garbodor'], gigantamax: true},
    garchompmega: {baseNames: ['Garchomp'], requiredItem: {slug: 'garchompite', name: 'Garchompite'}},
    gardevoirmega: {baseNames: ['Gardevoir'], requiredItem: {slug: 'gardevoirite', name: 'Gardevoirite'}},
    gengargmax: {baseNames: ['Gengar'], gigantamax: true},
    gengarmega: {baseNames: ['Gengar'], requiredItem: {slug: 'gengarite', name: 'Gengarite'}},
    glaliemega: {baseNames: ['Glalie'], requiredItem: {slug: 'glalitite', name: 'Glalitite'}},
    glimmoramega: {baseNames: ['Glimmora'], requiredItem: {slug: 'glimmoranite', name: 'Glimmoranite'}},
    golisopodmega: {baseNames: ['Golisopod'], requiredItem: {slug: 'golisopite', name: 'Golisopite'}},
    golurkmega: {baseNames: ['Golurk'], requiredItem: {slug: 'golurkite', name: 'Golurkite'}},
    // Showdown's own base for this is "Greninja-Bond" (a distinct forme
    // tracking the Battle Bond ability), but this app's DB has no separate
    // row for it - only plain "Greninja", which offers Battle Bond as a
    // normal selectable ability anyway.
    greninjaash: {baseNames: ['Greninja']},
    greninjamega: {baseNames: ['Greninja'], requiredItem: {slug: 'greninjite', name: 'Greninjite'}},
    grimmsnarlgmax: {baseNames: ['Grimmsnarl'], gigantamax: true},
    groudonprimal: {baseNames: ['Groudon'], requiredItem: {slug: 'redorb', name: 'Red Orb'}},
    gyaradosmega: {baseNames: ['Gyarados'], requiredItem: {slug: 'gyaradosite', name: 'Gyaradosite'}},
    hatterenegmax: {baseNames: ['Hatterene'], gigantamax: true},
    hawluchamega: {baseNames: ['Hawlucha'], requiredItem: {slug: 'hawluchanite', name: 'Hawluchanite'}},
    heatranmega: {baseNames: ['Heatran'], requiredItem: {slug: 'heatranite', name: 'Heatranite'}},
    heracrossmega: {baseNames: ['Heracross'], requiredItem: {slug: 'heracronite', name: 'Heracronite'}},
    houndoommega: {baseNames: ['Houndoom'], requiredItem: {slug: 'houndoominite', name: 'Houndoominite'}},
    inteleongmax: {baseNames: ['Inteleon'], gigantamax: true},
    kangaskhanmega: {baseNames: ['Kangaskhan'], requiredItem: {slug: 'kangaskhanite', name: 'Kangaskhanite'}},
    kinglergmax: {baseNames: ['Kingler'], gigantamax: true},
    kyogreprimal: {baseNames: ['Kyogre'], requiredItem: {slug: 'blueorb', name: 'Blue Orb'}},
    laprasgmax: {baseNames: ['Lapras'], gigantamax: true},
    latiasmega: {baseNames: ['Latias'], requiredItem: {slug: 'latiasite', name: 'Latiasite'}},
    latiosmega: {baseNames: ['Latios'], requiredItem: {slug: 'latiosite', name: 'Latiosite'}},
    lopunnymega: {baseNames: ['Lopunny'], requiredItem: {slug: 'lopunnite', name: 'Lopunnite'}},
    lucariomega: {baseNames: ['Lucario'], requiredItem: {slug: 'lucarionite', name: 'Lucarionite'}},
    machampgmax: {baseNames: ['Machamp'], gigantamax: true},
    magearnamega: {baseNames: ['Magearna'], requiredItem: {slug: 'magearnite', name: 'Magearnite'}},
    magearnaoriginalmega: {baseNames: ['Magearna-Original'], requiredItem: {slug: 'magearnite', name: 'Magearnite'}},
    malamarmega: {baseNames: ['Malamar'], requiredItem: {slug: 'malamarite', name: 'Malamarite'}},
    manectricmega: {baseNames: ['Manectric'], requiredItem: {slug: 'manectite', name: 'Manectite'}},
    mawilemega: {baseNames: ['Mawile'], requiredItem: {slug: 'mawilite', name: 'Mawilite'}},
    medichammega: {baseNames: ['Medicham'], requiredItem: {slug: 'medichamite', name: 'Medichamite'}},
    meganiummega: {baseNames: ['Meganium'], requiredItem: {slug: 'meganiumite', name: 'Meganiumite'}},
    melmetalgmax: {baseNames: ['Melmetal'], gigantamax: true},
    meloettapirouette: {baseNames: ['Meloetta']},
    meowsticfmega: {baseNames: ['Meowstic-F'], requiredItem: {slug: 'meowsticite', name: 'Meowsticite'}},
    meowsticmmega: {baseNames: ['Meowstic'], requiredItem: {slug: 'meowsticite', name: 'Meowsticite'}},
    meowthgmax: {baseNames: ['Meowth'], gigantamax: true},
    metagrossmega: {baseNames: ['Metagross'], requiredItem: {slug: 'metagrossite', name: 'Metagrossite'}},
    mewtwomegax: {baseNames: ['Mewtwo'], requiredItem: {slug: 'mewtwonitex', name: 'Mewtwonite X'}},
    mewtwomegay: {baseNames: ['Mewtwo'], requiredItem: {slug: 'mewtwonitey', name: 'Mewtwonite Y'}},
    mimikyubusted: {baseNames: ['Mimikyu']},
    // "Mimikyu-Totem" (the Totem-battle-mechanic variant) isn't itself a
    // real, obtainable forme - redirects to plain Mimikyu instead, verified
    // to validate.
    mimikyubustedtotem: {baseNames: ['Mimikyu']},
    miniormeteor: {baseNames: ['Minior']},
    morpekohangry: {baseNames: ['Morpeko']},
    necrozmaultra: {baseNames: ['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'], requiredItem: {slug: 'ultranecroziumz', name: 'Ultranecrozium Z'}},
    ogerponcornerstonetera: {baseNames: ['Ogerpon-Cornerstone'], requiredItem: {slug: 'cornerstonemask', name: 'Cornerstone Mask'}},
    ogerponhearthflametera: {baseNames: ['Ogerpon-Hearthflame'], requiredItem: {slug: 'hearthflamemask', name: 'Hearthflame Mask'}},
    ogerpontealtera: {baseNames: ['Ogerpon']},
    ogerponwellspringtera: {baseNames: ['Ogerpon-Wellspring'], requiredItem: {slug: 'wellspringmask', name: 'Wellspring Mask'}},
    orbeetlegmax: {baseNames: ['Orbeetle'], gigantamax: true},
    palafinhero: {baseNames: ['Palafin']},
    pidgeotmega: {baseNames: ['Pidgeot'], requiredItem: {slug: 'pidgeotite', name: 'Pidgeotite'}},
    pikachugmax: {baseNames: ['Pikachu'], gigantamax: true},
    pinsirmega: {baseNames: ['Pinsir'], requiredItem: {slug: 'pinsirite', name: 'Pinsirite'}},
    pyroarmega: {baseNames: ['Pyroar'], requiredItem: {slug: 'pyroarite', name: 'Pyroarite'}},
    raichumegax: {baseNames: ['Raichu'], requiredItem: {slug: 'raichunitex', name: 'Raichunite X'}},
    raichumegay: {baseNames: ['Raichu'], requiredItem: {slug: 'raichunitey', name: 'Raichunite Y'}},
    ramnarokradiant: {baseNames: ['Ramnarok']},
    rayquazamega: {baseNames: ['Rayquaza']},
    rillaboomgmax: {baseNames: ['Rillaboom'], gigantamax: true},
    sableyemega: {baseNames: ['Sableye'], requiredItem: {slug: 'sablenite', name: 'Sablenite'}},
    salamencemega: {baseNames: ['Salamence'], requiredItem: {slug: 'salamencite', name: 'Salamencite'}},
    sandacondagmax: {baseNames: ['Sandaconda'], gigantamax: true},
    sceptilemega: {baseNames: ['Sceptile'], requiredItem: {slug: 'sceptilite', name: 'Sceptilite'}},
    scizormega: {baseNames: ['Scizor'], requiredItem: {slug: 'scizorite', name: 'Scizorite'}},
    scolipedemega: {baseNames: ['Scolipede'], requiredItem: {slug: 'scolipite', name: 'Scolipite'}},
    scovillainmega: {baseNames: ['Scovillain'], requiredItem: {slug: 'scovillainite', name: 'Scovillainite'}},
    scraftymega: {baseNames: ['Scrafty'], requiredItem: {slug: 'scraftinite', name: 'Scraftinite'}},
    sharpedomega: {baseNames: ['Sharpedo'], requiredItem: {slug: 'sharpedonite', name: 'Sharpedonite'}},
    skarmorymega: {baseNames: ['Skarmory'], requiredItem: {slug: 'skarmorite', name: 'Skarmorite'}},
    slowbromega: {baseNames: ['Slowbro'], requiredItem: {slug: 'slowbronite', name: 'Slowbronite'}},
    snorlaxgmax: {baseNames: ['Snorlax'], gigantamax: true},
    staraptormega: {baseNames: ['Staraptor'], requiredItem: {slug: 'staraptite', name: 'Staraptite'}},
    starmiemega: {baseNames: ['Starmie'], requiredItem: {slug: 'starminite', name: 'Starminite'}},
    steelixmega: {baseNames: ['Steelix'], requiredItem: {slug: 'steelixite', name: 'Steelixite'}},
    swampertmega: {baseNames: ['Swampert'], requiredItem: {slug: 'swampertite', name: 'Swampertite'}},
    tatsugiricurlymega: {baseNames: ['Tatsugiri'], requiredItem: {slug: 'tatsugirinite', name: 'Tatsugirinite'}},
    tatsugiridroopymega: {baseNames: ['Tatsugiri-Droopy'], requiredItem: {slug: 'tatsugirinite', name: 'Tatsugirinite'}},
    tatsugiristretchymega: {baseNames: ['Tatsugiri-Stretchy'], requiredItem: {slug: 'tatsugirinite', name: 'Tatsugirinite'}},
    terapagosstellar: {baseNames: ['Terapagos']},
    terapagosterastal: {baseNames: ['Terapagos']},
    toxtricitygmax: {baseNames: ['Toxtricity'], gigantamax: true},
    toxtricitylowkeygmax: {baseNames: ['Toxtricity-Low-Key'], gigantamax: true},
    tyranitarmega: {baseNames: ['Tyranitar'], requiredItem: {slug: 'tyranitarite', name: 'Tyranitarite'}},
    urshifugmax: {baseNames: ['Urshifu'], gigantamax: true},
    urshifurapidstrikegmax: {baseNames: ['Urshifu-Rapid-Strike'], gigantamax: true},
    venusaurgmax: {baseNames: ['Venusaur'], gigantamax: true},
    venusaurmega: {baseNames: ['Venusaur'], requiredItem: {slug: 'venusaurite', name: 'Venusaurite'}},
    victreebelmega: {baseNames: ['Victreebel'], requiredItem: {slug: 'victreebelite', name: 'Victreebelite'}},
    wishiwashischool: {baseNames: ['Wishiwashi']},
    zaciancrowned: {baseNames: ['Zacian'], requiredItem: {slug: 'rustedsword', name: 'Rusted Sword'}},
    zamazentacrowned: {baseNames: ['Zamazenta'], requiredItem: {slug: 'rustedshield', name: 'Rusted Shield'}},
    zeraoramega: {baseNames: ['Zeraora'], requiredItem: {slug: 'zeraorite', name: 'Zeraorite'}},
    zygardecomplete: {baseNames: ['Zygarde', 'Zygarde-10%']},
    zygardemega: {baseNames: ['Zygarde', 'Zygarde-10%'], requiredItem: {slug: 'zygardite', name: 'Zygardite'}},
};
