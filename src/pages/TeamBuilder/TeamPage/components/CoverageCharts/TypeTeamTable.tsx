import {darken, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {PokemonType} from "../../../../../global/enums.ts";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import PokemonImg from "../../../../../components/PokemonImg/PokemonImg.tsx";
import {GridContainer} from "../../styles.ts";
import RelationBox from "./RelationBox.tsx";
import {COLORS} from "../../../../../theme/styles/colors.ts";
import {VersionToGen} from "../../constants.ts";
import {PokemonTeam} from "../../../../../global/types.ts";
import {FC, Fragment} from "react";

interface ITypeTeamTableProps {
    title: string;
    badColTitle: string;
    goodColTitle: string;
    currentTeam: PokemonTeam
    isCoverage?: boolean
    getMult: (index: number, type: PokemonType) => '1' | '0' | '2' | '4' | '1/2' | '1/4'
    getBadNum: (type: PokemonType) => number
    getGoodNum: (type: PokemonType) => number
}

const TypeTeamTable: FC<ITypeTeamTableProps> = ({title, badColTitle, goodColTitle, currentTeam, isCoverage, getMult, getBadNum, getGoodNum }) => {

    const centerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Paper sx={{padding: 3, marginY: 3}}>
            <Typography variant="h2" >{title}</Typography>
            <Grid container spacing={1}>
                <Grid size={(12/9)}></Grid>
                {
                    [...Array(6)].map((_, i) => {
                        const pokemon = currentTeam.pokemon[i]
                        return (
                            <Grid size={(12/9)} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center'}}>
                                {
                                    i < currentTeam.pokemon.length &&
                                    (<>
                                        <GridContainer>
                                            <PokemonImg id={pokemon.id} shiny={pokemon.shiny} female={pokemon.gender === 'female'}/>
                                        </GridContainer>
                                        <Typography>{pokemon.name}</Typography>
                                    </>)
                                }
                            </Grid>
                        )
                    })
                }
                <Grid size={(12/9)} sx={centerStyle}>{badColTitle}</Grid>
                <Grid size={(12/9)} sx={centerStyle}>{goodColTitle}</Grid>
                {
                    Object.values(PokemonType).map((type, i) => {
                        const totalBad = getBadNum(type)
                        const totalGood = getGoodNum(type)
                        if ((type === PokemonType.DARK || type === PokemonType.STEEL) && currentTeam.versionGroup && VersionToGen[currentTeam.versionGroup] < 2) return null;
                        if (type === PokemonType.FAIRY && currentTeam.versionGroup && VersionToGen[currentTeam.versionGroup] < 6) return null;
                        return (
                            <Fragment key={i}>
                                <Grid size={(12/9)} sx={centerStyle}>
                                    <TypeIcon type={type} variant="full"/>
                                </Grid>
                                {[...Array(6)].map((_, i) => {
                                    return (
                                        <Grid size={(12/9)} sx={centerStyle}>
                                            <RelationBox mult={getMult(i, type)} coverage={isCoverage}/>
                                        </Grid>
                                    )
                                })}
                                <Grid size={(12/9)} sx={{...centerStyle, borderRadius: 2, color: COLORS.WHITE, backgroundColor: totalBad > 0 ? darken(COLORS.RED, 0.12 * totalBad) : ''}}>
                                    {totalBad > 0 ? totalBad : ""}
                                </Grid>
                                <Grid size={(12/9)} sx={{...centerStyle, borderRadius: 2, color: COLORS.WHITE, backgroundColor: totalGood > 0 ? darken(COLORS.GREEN, 0.1 * totalGood) : ''}}>
                                    {totalGood > 0 ? totalGood : ""}
                                </Grid>
                            </Fragment>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
};

export default TypeTeamTable;