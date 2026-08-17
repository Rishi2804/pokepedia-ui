import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";
import {Box, Button, Typography} from "@mui/material";
import {FC, useState} from "react";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import type {Choice, SlotView} from "../../../../services/battle/protocol.ts";
import {SlotRow, SlotThumb} from "./styles.ts";

interface TeamPreviewProps {
    team: SlotView[];
    teamPreviewSize?: number;
    onChoose: (choice: Choice) => void;
}

// `order` holds 1-based indices into `team` - the same indexing
// view.ts's projectRequest uses for RequestSwitchView.index, which is what
// the server expects back in a `{kind:'team', order}` choice.
const TeamPreview: FC<TeamPreviewProps> = ({team, teamPreviewSize, onChoose}) => {
    const [order, setOrder] = useState<number[]>(() => team.map((_, i) => i + 1));
    const bringCount = teamPreviewSize ?? team.length;

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id === over?.id) return;
        const activeIndex = order.indexOf(active.id as number);
        const overIndex = order.indexOf(over?.id as number);
        if (activeIndex !== -1 && overIndex !== -1) setOrder(arrayMove(order, activeIndex, overIndex));
    };

    return (
        <Box>
            <Typography variant="h4" sx={{marginBottom: 1}}>Team Preview</Typography>
            <Typography variant="body2" color="text.secondary" sx={{marginBottom: 2}}>
                Drag to set your lead order{bringCount < team.length ? ` — bring your first ${bringCount}` : ''}.
            </Typography>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={order}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2}}>
                        {order.map((slotIndex, position) => (
                            <TeamPreviewSlot
                                key={slotIndex}
                                id={slotIndex}
                                mon={team[slotIndex - 1]}
                                position={position + 1}
                                willBring={position < bringCount}
                            />
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>
            <Button variant="contained" onClick={() => onChoose({kind: 'team', order})}>
                Confirm Lead Order
            </Button>
        </Box>
    );
};

interface TeamPreviewSlotProps {
    id: number;
    mon: SlotView;
    position: number;
    willBring: boolean;
}

const TeamPreviewSlot: FC<TeamPreviewSlotProps> = ({id, mon, position, willBring}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    return (
        <SlotRow
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
                transition: transition ?? 'transform 200ms ease',
                opacity: willBring ? 1 : 0.5,
            }}
        >
            <Typography variant="body1" sx={{width: 24}}>{position}</Typography>
            <SlotThumb>
                <PokemonImg id={mon.spriteId ?? 0} shiny={mon.shiny} female={mon.female}/>
            </SlotThumb>
            <Typography variant="body1">{mon.name}</Typography>
        </SlotRow>
    );
};

export default TeamPreview;
