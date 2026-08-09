import {FC, useState} from "react";
import {Box, Button, TextField} from "@mui/material";

interface ImportExportProps {
    label: string;
    exportText: string;
    onImport: (text: string) => Promise<string[]>;
    disabled?: boolean;
}

// Just the panel content — the parent owns the show/hide toggle and any
// Collapse wrapper, since where that toggle lives differs between a single
// set (SetEditor's header) and a whole team (TeamSelection's header).
const ImportExport: FC<ImportExportProps> = ({label, exportText, onImport, disabled}) => {
    const [text, setText] = useState(exportText);
    const [errors, setErrors] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);

    const handleImport = async () => {
        setImporting(true);
        const result = await onImport(text);
        setErrors(result);
        setImporting(false);
    };

    return (
        <Box sx={{marginTop: 2, marginBottom: 2}}>
            {errors.length > 0 && (
                <Box sx={{color: 'error.main', marginBottom: 1, whiteSpace: 'pre-line'}}>
                    {errors.join('\n')}
                </Box>
            )}
            <TextField
                fullWidth
                multiline
                minRows={8}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={`Paste a Showdown-format ${label.toLowerCase()} here…`}
                slotProps={{htmlInput: {style: {fontFamily: 'monospace', fontSize: 13}}}}
                sx={{marginBottom: 1}}
            />
            <Box sx={{display: 'flex', gap: 1}}>
                <Button variant="outlined" onClick={() => setText(exportText)}>Export {label}</Button>
                <Button variant="contained" onClick={handleImport} disabled={disabled || importing}>
                    Import {label}
                </Button>
            </Box>
        </Box>
    );
};

export default ImportExport;
