import {darken, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {PokemonType} from "../../../../../global/enums.ts";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import {useTeamStore} from "../../../../../store/teamStore.ts";
import PokemonImg from "../../../../../components/PokemonImg/PokemonImg.tsx";
import {GridContainer} from "../../styles.ts";
import RelationBox from "./RelationBox.tsx";
import {getTypeDefenses} from "../../../../../global/utils.ts";
import {COLORS} from "../../../../../theme/styles/colors.ts";

const TypeDefensesTable = () => {
    const { currentTeam } = useTeamStore();

    const centerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const coverages = currentTeam.pokemon.map(mon => {
        if (mon.teraType) return getTypeDefenses(mon.teraType, null, mon.ability.id)
        return getTypeDefenses(mon.type1, mon.type2, mon.ability.id)
    })

    const getMult = (index: number, type: PokemonType) => {
        if (currentTeam.pokemon.length <= index) return '1'
        const spread = coverages[index]
        if (spread.x0.includes(type)) return '0'
        if (spread.x2.includes(type)) return '2'
        if (spread.x4.includes(type)) return '4'
        if (spread.x1_2.includes(type)) return '1/2'
        if (spread.x1_4.includes(type)) return '1/4'
        return '1'
    }

    const getTotalWeaknesses = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x2.includes(type) || spread.x4.includes(type))
        ).length
    }

    const getTotalResist = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x1_2.includes(type) || spread.x1_4.includes(type) || spread.x0.includes(type))
        ).length
    }

    return (
        <Paper sx={{padding: 3, marginY: 3}}>
            <Typography variant="h2" >Defensive Coverage</Typography>
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
                <Grid size={(12/9)} sx={centerStyle}>Total Weak</Grid>
                <Grid size={(12/9)} sx={centerStyle}>Total Resist</Grid>
                {
                    Object.values(PokemonType).map(type => {
                        const totalWeak = getTotalWeaknesses(type)
                        const totalResist = getTotalResist(type)

                        return (
                            <>
                                <Grid size={(12/9)} sx={centerStyle}>
                                    <TypeIcon type={type} variant="full"/>
                                </Grid>
                                {[...Array(6)].map((_, i) => {
                                    return (
                                        <Grid size={(12/9)} sx={centerStyle}>
                                            <RelationBox mult={getMult(i, type)} />
                                        </Grid>
                                    )
                                })}
                                <Grid size={(12/9)} sx={{...centerStyle, borderRadius: 2, color: COLORS.WHITE, backgroundColor: totalWeak > 0 ? darken(COLORS.RED, 0.12 * totalWeak) : ''}}>
                                    {totalWeak > 0 ? totalWeak : ""}
                                </Grid>
                                <Grid size={(12/9)} sx={{...centerStyle, borderRadius: 2, color: COLORS.WHITE, backgroundColor: totalResist > 0 ? darken(COLORS.GREEN, 0.1 * totalResist) : ''}}>
                                    {totalResist > 0 ? totalResist : ""}
                                </Grid>
                            </>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
};

export default TypeDefensesTable;