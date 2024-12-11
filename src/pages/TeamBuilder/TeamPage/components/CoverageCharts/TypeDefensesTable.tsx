import {PokemonType} from "../../../../../global/enums.ts";
import {useTeamStore} from "../../../../../store/teamStore.ts";
import {getTypeDefenses} from "../../../../../global/utils.ts";
import TypeTeamTable from "./TypeTeamTable.tsx";

const TypeDefensesTable = () => {
    const {currentTeam} = useTeamStore();

    if (!currentTeam) return null;

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
        <TypeTeamTable
            title={"Defensive Coverage"}
            badColTitle={"Total Weak"}
            goodColTitle={"Total Resist"}
            currentTeam={currentTeam}
            getMult={getMult}
            getBadNum={getTotalWeaknesses}
            getGoodNum={getTotalResist}
        />
    );
};

export default TypeDefensesTable;