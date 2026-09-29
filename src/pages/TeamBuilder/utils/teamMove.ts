import {TeamMove} from "../../../global/types.ts";

// Teams persist only a move's identity. The picker's per-game values belong to
// the game being edited, so they're dropped here rather than saved and shown
// stale if the team's game changes. Also returns a fresh object: callers such as
// MovesColumn override `type` for Hidden Power / Tera Blast, which must not
// write through to the shared, cached candidate data.
export function toStoredMove(m: TeamMove): TeamMove {
    return {id: m.id, name: m.name, type: m.type, moveClass: m.moveClass};
}
