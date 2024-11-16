/// <reference types="vite-plugin-svgr/client" />
import React, {useEffect, useState} from 'react';
import {PokemonType} from "../../global/enums.ts";
import {TypeToColor} from "../../global/utils.ts";
import {Box, Typography} from "@mui/material";
import {IconContainer} from "./styles.ts";

interface ITypeIconProps {
    type: PokemonType
    variant?: "full" | "filled" | "circular" | "outlined" | 'empty',
    size?: number,
}

const TypeIcon = ({type, variant="full", size}: ITypeIconProps) => {
    const [TypeSVG, setTypeSVG] = useState<React.FC<React.SVGProps<SVGElement>> | null>(null)

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const ReactComponent = await import(`./assets/${type.toLowerCase()}-icon.svg`);
                setTypeSVG(() => ReactComponent.default);
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        loadSvg()
    }, [type]);

    if (variant === 'filled' || variant === 'circular') {
        return (
            <IconContainer type={type} size={size} circular={variant === 'circular'}>
            {/*<Box style={{justifyContent: 'space-between', width: size ?? '50px', height: size ?? '50px', backgroundColor: TypeToColor[type], borderRadius: 10, alignItems: 'center'}}>*/}
                {TypeSVG ? <TypeSVG width={"100%"} height={"100%"} color={"#fff"}/> : <p>Loading...</p>}
            {/*</Box>*/}
            </IconContainer>
        )
    }

    if (variant === 'outlined' || variant === 'empty') {
        return (
            <>
                {TypeSVG ? <TypeSVG width={40} height={40} color={variant === 'outlined' ? TypeToColor[type] : "#fff"} /> : <p>Loading...</p>}
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
