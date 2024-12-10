import * as React from 'react';
import TeraIcon from "./TeraIcon.tsx";
import {TeraButton} from "../../styles.ts";
import {PokemonType} from "../../../../../global/enums.ts";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import {Popover, Box} from "@mui/material";
import {FC} from "react";

interface TeraTypeMenuProps {
    teraType?: PokemonType
    changeTeraType: (tera?: PokemonType) => void;
    disabled?: boolean;
}

const TeraTypeMenu: FC<TeraTypeMenuProps> = ({teraType, changeTeraType, disabled}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (teraType) changeTeraType()
        else setAnchorEl(event.currentTarget);
    };
    const handleClose = (tera?: PokemonType) => {
        if (tera) changeTeraType(tera);
        setAnchorEl(null);
    };

    return (
        <>
            <TeraButton
                onClick={handleClick}
                disabled={disabled}
            >
                {teraType ?
                    <TypeIcon type={teraType} size={30} variant="circular" /> :
                    <TeraIcon width={30} height={30} color={'#fff'}/>}
            </TeraButton>
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                slotProps={{
                    paper: {
                        style: {
                            height: 200,
                            width: 300,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                        },
                    },
                }}
            >
                {
                    Object.values(PokemonType).map((type, i) => {
                        return (
                            <Box
                                key={i}
                                sx={{padding: 1, display: 'flex', alignItems: 'center', height: 40}}
                                onClick={() => handleClose(type)}
                            >
                                <TypeIcon type={type} size={30} variant={"circular"} />
                            </Box>
                        )
                    })
                }
            </Popover>
        </>
    );
}

export default TeraTypeMenu;