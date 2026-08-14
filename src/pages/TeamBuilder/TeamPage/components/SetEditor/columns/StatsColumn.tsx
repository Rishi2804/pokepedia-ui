import {FC} from "react";
import {Box, MenuItem, Select, Slider, TextField, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {AbilityInput, StaticLabel} from "../../../styles.ts";
import {ColumnPaper} from "../styles.ts";
import StatMeter from "../StatMeter.tsx";
import {PokemonTeamMember, StatKey, StatSpread, TeamCandidate} from "../../../../../../global/types.ts";
import {PokemonType} from "../../../../../../global/enums.ts";
import {COLORS} from "../../../../../../theme/styles/colors.ts";
import {GenRules} from "../../../../genRules.ts";
import {NATURES, NatureName} from "../../../../../../global/data/natures.ts";
import {useTeamStore} from "../../../../../../store/teamStore.ts";
import {
    computeFinalStat, hiddenPowerOptions, hiddenPowerType, hiddenPowerTypeGen2,
    hpDvFromDvs, ivsForHiddenPower, natureMultiplier, referenceMaxStat, syncHiddenPowerMoveType,
} from "../../../../utils/stats.ts";

const STAT_ORDER: StatKey[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
const STAT_LABELS: Record<StatKey, string> = {hp: 'HP', atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed'};
type IvPreset = 'max' | 'noAtk' | 'noSpe' | 'noAtkNoSpe';

// Shared widths so the header row lines up with every stat row below it. The row
// wraps rather than squeezing on narrow screens, which is why each cell has a fixed
// basis instead of relying on the flex container's width.
const W = {label: 120, base: 36, ev: 88, iv: 76, total: 48} as const;

interface StatsColumnProps {
    slot: number;
    member: PokemonTeamMember;
    candidate: TeamCandidate;
    rules: GenRules;
    editMode: boolean;
}

const StatsColumn: FC<StatsColumnProps> = ({slot, member, candidate, rules, editMode}) => {
    const {editPokemon} = useTeamStore();
    const update = (patch: Partial<PokemonTeamMember>) => editPokemon(slot, {...member, ...patch});

    const isDvModel = rules.ivModel === 'dv';
    const ivCap = isDvModel ? 15 : 31;
    const evTotal = STAT_ORDER.reduce((sum, k) => sum + member.evs[k], 0);
    const remaining = rules.evTotalCap !== null ? rules.evTotalCap - evTotal : null;

    const setEv = (stat: StatKey, value: number) => {
        // With a total cap, the most this stat can take is whatever's left in
        // the budget once its own current value is added back — otherwise
        // spending past the cap on other stats just drove "Remaining" negative.
        const maxForStat = remaining !== null ? Math.min(rules.evCap, remaining + member.evs[stat]) : rules.evCap;
        const clamped = Math.max(0, Math.min(maxForStat, value));
        update({evs: {...member.evs, [stat]: clamped}});
    };

    // Hidden Power's move type is derived from IVs, not stored independently
    // (the same relationship Tera Blast has with teraType), so every path that
    // changes ivs also needs to re-sync it onto any selected Hidden Power move.
    const updateIvs = (ivs: StatSpread) => {
        update({ivs, moves: syncHiddenPowerMoveType(member.moves, ivs, rules.ivModel)});
    };

    const setIv = (stat: StatKey, value: number) => {
        const clamped = Math.max(0, Math.min(ivCap, value));
        let ivs = {...member.ivs, [stat]: clamped};
        if (isDvModel && stat !== 'hp') ivs = {...ivs, hp: hpDvFromDvs(ivs)};
        updateIvs(ivs);
    };

    const applyIvPreset = (preset: IvPreset) => {
        const ivs: StatSpread = {hp: ivCap, atk: ivCap, def: ivCap, spa: ivCap, spd: ivCap, spe: ivCap};
        if (preset === 'noAtk' || preset === 'noAtkNoSpe') ivs.atk = 0;
        if (preset === 'noSpe' || preset === 'noAtkNoSpe') ivs.spe = 0;
        if (isDvModel) ivs.hp = hpDvFromDvs(ivs);
        updateIvs(ivs);
    };

    const hpOptions = rules.hiddenPower ? hiddenPowerOptions(rules.ivModel) : [];
    const currentHpType = rules.hiddenPower
        ? (isDvModel ? hiddenPowerTypeGen2(member.ivs) : hiddenPowerType(member.ivs))
        : null;

    return (
        <ColumnPaper elevation={2}>
            <Typography variant="h4" sx={{marginBottom: 2}}>Stats</Typography>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginBottom: 1}}>
                <Box sx={{width: W.label, flexShrink: 0}}/>
                <Typography variant="body2" sx={{width: W.base, flexShrink: 0}}>Base</Typography>
                <Box sx={{flex: '1 1 120px', minWidth: 80}}/>
                <Typography variant="body2" sx={{width: W.ev, flexShrink: 0}}>{rules.evLabel}</Typography>
                <Box sx={{flex: '1 1 140px', minWidth: 110}}/>
                <Typography variant="body2" sx={{width: W.iv, flexShrink: 0}}>{isDvModel ? 'DV' : 'IV'}</Typography>
                <Typography variant="body2" sx={{width: W.total, flexShrink: 0, textAlign: 'end'}}>Stat</Typography>
            </Box>

            {STAT_ORDER.map(stat => {
                const base = candidate.baseStats[stat];
                const mod = natureMultiplier(member.nature, stat);
                const isHpDerived = isDvModel && stat === 'hp';
                const value = computeFinalStat({
                    pokemonId: member.id, stat, base,
                    iv: member.ivs[stat], ev: member.evs[stat],
                    level: member.level, nature: member.nature, evModel: rules.evModel,
                });
                const refMax = referenceMaxStat(stat, member.level, rules);

                return (
                    <Box key={stat} sx={{display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginBottom: 1}}>
                        {/* nowrap + flexShrink keep the nature arrow on the same line as the
                            stat name; when it wrapped it read as a stray box glyph. */}
                        <Box sx={{width: W.label, flexShrink: 0, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                            <Typography>{STAT_LABELS[stat]}</Typography>
                            {mod > 1 && <ArrowDropUpIcon sx={{color: COLORS.GREEN}} titleAccess="Boosted by nature"/>}
                            {mod < 1 && <ArrowDropDownIcon sx={{color: COLORS.RED}} titleAccess="Hindered by nature"/>}
                        </Box>
                        <Typography sx={{width: W.base, flexShrink: 0}}>{base}</Typography>
                        <StatMeter type1={candidate.type1} type2={candidate.type2} base={base} final={value} referenceMax={refMax}/>
                        <TextField
                            size="small"
                            type="number"
                            aria-label={`${STAT_LABELS[stat]} ${rules.evLabel}`}
                            value={member.evs[stat]}
                            onChange={e => setEv(stat, Number(e.target.value) || 0)}
                            disabled={!editMode}
                            slotProps={{htmlInput: {min: 0, max: rules.evCap, 'aria-label': `${STAT_LABELS[stat]} ${rules.evLabel}`}}}
                            sx={{width: W.ev, flexShrink: 0}}
                        />
                        <Slider
                            size="small"
                            value={member.evs[stat]}
                            min={0}
                            max={rules.evCap}
                            onChange={(_, v) => setEv(stat, v as number)}
                            disabled={!editMode}
                            aria-label={`${STAT_LABELS[stat]} ${rules.evLabel} slider`}
                            sx={{flex: '1 1 140px', minWidth: 110}}
                        />
                        <TextField
                            size="small"
                            type="number"
                            value={member.ivs[stat]}
                            onChange={e => setIv(stat, Number(e.target.value) || 0)}
                            disabled={!editMode || isHpDerived}
                            slotProps={{htmlInput: {min: 0, max: ivCap, 'aria-label': `${STAT_LABELS[stat]} ${isDvModel ? 'DV' : 'IV'}`}}}
                            sx={{width: W.iv, flexShrink: 0}}
                        />
                        <Typography sx={{width: W.total, flexShrink: 0, textAlign: 'end'}}>{value ?? '—'}</Typography>
                    </Box>
                );
            })}

            {remaining !== null && (
                <Typography variant="body2" sx={{marginTop: 2, marginBottom: 1}}>
                    Remaining {rules.evLabel}: {remaining}
                </Typography>
            )}

            <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end', marginTop: 1}}>
                {rules.natures && (
                    <FormControl sx={{flex: '1 1 260px'}}>
                        <StaticLabel>Nature</StaticLabel>
                        <Select
                            variant="outlined"
                            value={member.nature}
                            onChange={e => update({nature: e.target.value as NatureName})}
                            input={<AbilityInput/>}
                            disabled={!editMode}
                        >
                            {(Object.keys(NATURES) as NatureName[]).map(key => {
                                const nature = NATURES[key];
                                return (
                                    <MenuItem value={key} key={key}>
                                        {nature.name}
                                        {nature.plus && nature.minus ? ` (+${STAT_LABELS[nature.plus]}, -${STAT_LABELS[nature.minus]})` : ''}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                )}

                <FormControl sx={{flex: '1 1 260px'}}>
                    <StaticLabel shrink>IV Spread Presets</StaticLabel>
                    <Select
                        variant="outlined"
                        value=""
                        onChange={e => applyIvPreset(e.target.value as IvPreset)}
                        input={<AbilityInput/>}
                        disabled={!editMode}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Choose a preset…</MenuItem>
                        <MenuItem value="max">All {ivCap}</MenuItem>
                        <MenuItem value="noAtk">0 Attack</MenuItem>
                        <MenuItem value="noSpe">0 Speed</MenuItem>
                        <MenuItem value="noAtkNoSpe">0 Attack / 0 Speed</MenuItem>
                    </Select>
                </FormControl>

                {rules.hiddenPower && (
                    <FormControl sx={{flex: '1 1 260px'}}>
                        <StaticLabel>Hidden Power</StaticLabel>
                        <Select
                            variant="outlined"
                            value={currentHpType ?? ''}
                            onChange={e => updateIvs(ivsForHiddenPower(e.target.value as PokemonType, rules.ivModel))}
                            input={<AbilityInput/>}
                            disabled={!editMode}
                        >
                            {hpOptions.map(type => (
                                <MenuItem value={type} key={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
        </ColumnPaper>
    );
};

export default StatsColumn;
