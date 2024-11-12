/// <reference types="vite-plugin-svgr/client" />
import React, {useEffect, useState} from 'react';
import {PokemonType} from "../../global/enums.ts";
import {TypeToColor} from "../../global/utils.ts";
import {Box, Typography} from "@mui/material";

interface ITypeIconProps {
    type: PokemonType
    variant?: "full" | "filled" | "outlined" | 'empty'
}

const TypeIcon = ({type, variant="full"}: ITypeIconProps) => {
    const [TypeSVG, setTypeSVG] = useState<React.FC<React.SVGProps<SVGElement>> | null>(null)

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const ReactComponent = await import(`./assets/${type}-icon.svg`);
                setTypeSVG(() => ReactComponent.default);
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        loadSvg()
    }, [type]);

    if (variant === 'filled') {
        return (
            <Box style={{justifyContent: 'space-between', width: '50px', height: '50px', backgroundColor: TypeToColor[type], borderRadius: 10, alignItems: 'center'}}>
                {TypeSVG ? <TypeSVG width={"100%"} height={"100%"} color={"#fff"}/> : <p>Loading...</p>}
            </Box>
        )
    }

    if (variant === 'outlined' || variant === 'empty') {
        return (
            <>
                {TypeSVG ? <TypeSVG width={'50px'} height={"50px"} color={variant === 'outlined' ? TypeToColor[type] : "#fff"} /> : <p>Loading...</p>}
            </>
        )
    }

    return (
        <Box style={{justifyContent: 'space-between', width: '130px', height: '40px', backgroundColor: TypeToColor[type], borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '5px'}}>
            {TypeSVG ? <TypeSVG width={"50px"} height={"50px"} color={"#fff"}/> : <p>Loading...</p>}
            <Typography style={{color: "white", fontWeight: "bolder", textAlign: 'center', width: "100%"}}>{type.toUpperCase()}</Typography>
        </Box>
    );
}

export default TypeIcon;
