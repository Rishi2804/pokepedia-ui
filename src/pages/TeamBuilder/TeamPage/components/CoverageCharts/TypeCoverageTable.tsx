import {MoveClass, PokemonType} from "../../../../../global/enums.ts";
import {useTeamStore} from "../../../../../store/teamStore.ts";
import {getTypeStrengths} from "../../../../../global/utils.ts";
import {TeamMove, TypeCoverage} from "../../../../../global/types.ts";
import TypeTeamTable from "./TypeTeamTable.tsx";

const TypeCoverageTable = () => {
    const {currentTeam} = useTeamStore();

    if (!currentTeam) return null;

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

    const getTotalStrong = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x2.includes(type))
        ).length
    }

    const getTotalWeak = (type: PokemonType) => {
        return coverages.filter(spread =>
            (spread.x1_2.includes(type) || spread.x0.includes(type))
        ).length
    }

    return (
        <TypeTeamTable
            isCoverage
            title={"Offensive Coverages"}
            badColTitle={"Not Effective"}
            goodColTitle={"Very Effective"}
            currentTeam={currentTeam}
            getMult={getMult}
            getBadNum={getTotalWeak}
            getGoodNum={getTotalStrong}
        />
    );
};

export default TypeCoverageTable;