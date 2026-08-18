import type {StatusName} from "../../../services/battle/protocol.ts";

// Shared between StatBar (status pill) and SideBar (fainted/statused pip
// ring) so the two don't drift into different colors for the same status.
export const STATUS_LABEL: Record<StatusName, string> = {
    brn: 'BRN', par: 'PAR', slp: 'SLP', frz: 'FRZ', psn: 'PSN', tox: 'TOX',
};

export const STATUS_COLOR: Record<StatusName, string> = {
    brn: '#e0733f', par: '#e0c23f', slp: '#8a8a8a', frz: '#6fd0e0', psn: '#a35fcf', tox: '#a35fcf',
};
