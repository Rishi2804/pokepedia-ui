import {Box, Typography} from "@mui/material";
import {FC} from "react";
import {TypeToColor} from "../../../../global/utils.ts";
import type {BoostID, Named, SlotView} from "../../../../services/battle/protocol.ts";
import {COLORS} from "../../../../theme/styles/colors.ts";
import {Pill} from "../sharedStyles.ts";
import {STATUS_COLOR, STATUS_LABEL} from "../statusTheme.ts";
import {toPokemonType} from "../typeHelpers.ts";
import {HpFill, HpTrack} from "./styles.ts";

const BOOST_LABEL: Record<BoostID, string> = {
    atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe', accuracy: 'Acc', evasion: 'Eva',
};

interface StatBarProps {
    slot: SlotView;
    /** Only the active Pokemon has these - see ActiveView. */
    boosts?: Partial<Record<BoostID, number>>;
    volatiles?: Named[];
    align?: 'left' | 'right';
}

// Deliberately shows hpPercent for both sides rather than exact hp/maxhp -
// a foe's SlotView already redacts those to a percent-scaled pair
// server-side (see view.ts's projectSlot), so a uniform percent display
// avoids a mine-vs-foe branch for what is cosmetic anyway.
const StatBar: FC<StatBarProps> = ({slot, boosts, volatiles, align = 'left'}) => {
    const genderColor = slot.gender === 'M' ? COLORS.MALE : slot.gender === 'F' ? COLORS.FEMALE : null;
    const genderSymbol = slot.gender === 'M' ? '♂' : slot.gender === 'F' ? '♀' : null;
    const hasBoosts = boosts && Object.values(boosts).some(v => !!v);
    const hasBadges = !!slot.status || !!slot.terastallized || !!slot.item || !!slot.ability || hasBoosts || !!volatiles?.length;

    return (
        <Box sx={{width: '100%', maxWidth: 240, textAlign: align}}>
            <Box sx={{display: 'flex', alignItems: 'baseline', gap: 0.5, justifyContent: align === 'right' ? 'flex-end' : 'flex-start'}}>
                <Typography variant="body1" sx={{fontWeight: 700}}>{slot.name}</Typography>
                {genderSymbol && <Typography variant="body2" sx={{color: genderColor, fontWeight: 700}}>{genderSymbol}</Typography>}
                <Typography variant="body2" color="text.secondary">Lv.{slot.level}</Typography>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.5, flexDirection: align === 'right' ? 'row-reverse' : 'row'}}>
                <HpTrack sx={{flex: 1}}>
                    <HpFill percent={slot.hpPercent} color={slot.hpColor}/>
                </HpTrack>
                <Typography variant="body2" color="text.secondary" sx={{minWidth: 34}}>
                    {slot.fainted ? '--' : `${slot.hpPercent}%`}
                </Typography>
            </Box>

            {hasBadges && (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 0.5, justifyContent: align === 'right' ? 'flex-end' : 'flex-start'}}>
                    {slot.status && <Pill bg={STATUS_COLOR[slot.status]}>{STATUS_LABEL[slot.status]}</Pill>}
                    {boosts && Object.entries(boosts)
                        .filter((entry): entry is [BoostID, number] => !!entry[1])
                        .map(([id, value]) => (
                            <Pill key={id} bg={value > 0 ? '#3f8f4f' : '#a3402f'}>
                                {value > 0 ? '+' : ''}{value} {BOOST_LABEL[id]}
                            </Pill>
                        ))}
                    {volatiles?.map(v => <Pill key={v.id} bg="#5c6370">{v.name}</Pill>)}
                    {slot.terastallized && <Pill bg={TypeToColor[toPokemonType(slot.terastallized)]}>Tera {slot.terastallized}</Pill>}
                    {slot.item && <Pill bg="#8a7a4a">{slot.item.name}</Pill>}
                    {slot.ability && <Pill bg="#4a5f8a">{slot.ability.name}</Pill>}
                </Box>
            )}
        </Box>
    );
};

export default StatBar;
