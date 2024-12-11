import {darken, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {MoveClass, PokemonType} from "../../../../../global/enums.ts";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import {useTeamStore} from "../../../../../store/teamStore.ts";
import PokemonImg from "../../../../../components/PokemonImg/PokemonImg.tsx";
import {GridContainer} from "../../styles.ts";
import RelationBox from "./RelationBox.tsx";
import {getTypeStrengths} from "../../../../../global/utils.ts";
import {COLORS} from "../../../../../theme/styles/colors.ts";
import {VersionToGen} from "../../constants.ts";
import {TeamMove, TypeCoverage} from "../../../../../global/types.ts";

const TypeCoverageTable = () => {
    const { currentTeam } = useTeamStore();

    if (!currentTeam) return null;

    const centerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const coverages: TypeCoverage[] = currentTeam.pokemon.map(mon => {
        // @ts-ignore
        const activeMoves: TeamMove[] = mon.moves.filter(move => (move !== null && move.moveClass !== MoveClass.STATUS))
        const movesCoverage = activeMoves.map(move => (getTypeStrengths(move.type)))
        const xs = new Set<PokemonType>()
        const xw = new Set<PokemonType>()
        const xi = new Set<PokemonType>()
        movesCoverage.forEach(coverage => {
            coverage.x2.forEach(item => xs.add(item))
            coverage.x1_2.forEach(item => xw.add(item))
            coverage.x0.forEach(item => xi.add(item))
        })
        const typesToRemove = new Set<PokemonType>();
        xi.forEach(type => {
            const isValid = movesCoverage.every(coverage => coverage.x0.includes(type));

            if (!isValid) {
                typesToRemove.add(type);
            }
        });

        typesToRemove.forEach(type => xi.delete(type));

        typesToRemove.clear()

        xw.forEach(type => {
            const isValid = movesCoverage.every(coverage =>
                coverage.x1_2.includes(type)
            );

            if (!isValid) {
                typesToRemove.add(type);
            }
        });

        typesToRemove.forEach(type => xw.delete(type));

        return {x2: [...xs], x1_2: [...xw], x0: [...xi]}
    })

    const getMult = (index: number, type: PokemonType) => {
        if (currentTeam.pokemon.length <= index) return '1'
        const spread = coverages[index]
        if (spread.x0.includes(type)) return '0'
        if (spread.x2.includes(type)) return '2'
        if (spread.x1_2.includes(type)) return '1/2'
        return '1'
    }

    const getTotalWeak = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x2.includes(type))
        ).length
    }

    const getTotalStrong = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x1_2.includes(type) || spread.x0.includes(type))
        ).length
    }

    return (
        <Paper sx={{padding: 3, marginY: 3}}>
            <Typography variant="h2" >Offensive Coverage</Typography>
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
                <Grid size={(12/9)} sx={centerStyle}>Not Effective</Grid>
                <Grid size={(12/9)} sx={centerStyle}>Very Effective</Grid>
                {
                    Object.values(PokemonType).map(type => {
                        const totalWeak = getTotalStrong(type)
                        const totalResist = getTotalWeak(type)
                        if ((type === PokemonType.DARK || type === PokemonType.STEEL) && currentTeam.versionGroup && VersionToGen[currentTeam.versionGroup] < 2) return null;
                        if (type === PokemonType.FAIRY && currentTeam.versionGroup && VersionToGen[currentTeam.versionGroup] < 6) return null;
                        return (
                            <>
                                <Grid size={(12/9)} sx={centerStyle}>
                                    <TypeIcon type={type} variant="full"/>
                                </Grid>
                                {[...Array(6)].map((_, i) => {
                                    return (
                                        <Grid size={(12/9)} sx={centerStyle}>
                                            <RelationBox mult={getMult(i, type)} coverage />
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

export default TypeCoverageTable;