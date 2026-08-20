import {Box} from "@mui/material";
import {FC} from "react";
import type {FieldView} from "../../../../services/battle/protocol.ts";
import {Pill} from "../sharedStyles.ts";

interface FieldStripProps {
    turn: number;
    field: FieldView;
}

const FieldStrip: FC<FieldStripProps> = ({turn, field}) => (
    <Box sx={{display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', marginBottom: 1}}>
        <Pill bg="#4a5568">Turn {turn}</Pill>
        {field.weather && <Pill bg="#3f6f9e">{field.weather.name}</Pill>}
        {field.terrain && <Pill bg="#6f9e3f">{field.terrain.name}</Pill>}
        {field.pseudoWeather.map(pw => <Pill key={pw.id} bg="#7a5c9e">{pw.name}</Pill>)}
    </Box>
);

export default FieldStrip;
