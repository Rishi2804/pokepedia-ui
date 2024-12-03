import {PokemonType} from "./enums.ts";
import {TypeDefences} from "./types.ts";

export function formatText(name: string): string {
    if (name === 'jangmo-o' || name === 'hakamo-o' || name === 'kommo-o') {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const TypeToColor: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#777777",
    [PokemonType.FIRE]: "#c26746",
    [PokemonType.WATER]: "#578bd3",
    [PokemonType.GRASS]: "#5d8a44",
    [PokemonType.ELECTRIC]: "#d1b752",
    [PokemonType.FLYING]: "#7d9ec4",
    [PokemonType.FIGHTING]: "#ca8e43",
    [PokemonType.PSYCHIC]: "#c87183",
    [PokemonType.DARK]: "#433f3e",
    [PokemonType.GHOST]: "#594061",
    [PokemonType.ICE]: "#79bcc0",
    [PokemonType.BUG]: "#969543",
    [PokemonType.GROUND]: "#8d6c42",
    [PokemonType.ROCK]: "#9e9b7c",
    [PokemonType.STEEL]: "#799fbb",
    [PokemonType.POISON]: "#7951ba",
    [PokemonType.DRAGON]: "#5462ab",
    [PokemonType.FAIRY]: "#c78bd5"
};

export const TypeToCardColor: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#C1C2C1",
    [PokemonType.FIRE]: "#FC6C6C",
    [PokemonType.WATER]: "#60A5FA",
    [PokemonType.GRASS]: "#5DBE62",
    [PokemonType.ELECTRIC]: "#EDD53E",
    [PokemonType.FLYING]: "#81BAEF",
    [PokemonType.FIGHTING]: "#FFAC59",
    [PokemonType.PSYCHIC]: "#F584A7",
    [PokemonType.DARK]: "#5F606D",
    [PokemonType.GHOST]: "#A284A2",
    [PokemonType.ICE]: "#98D8D8",
    [PokemonType.BUG]: "#9DC12F",
    [PokemonType.GROUND]: "#B78E6F",
    [PokemonType.ROCK]: "#C7C3A9",
    [PokemonType.STEEL]: "#97C2D1",
    [PokemonType.POISON]: "#B563CE",
    [PokemonType.DRAGON]: "#8D98EC",
    [PokemonType.FAIRY]: "#EF97E6"
};

export const TypeToCardBorder: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: "#9FA19F",
    [PokemonType.FIRE]: "#E62829",
    [PokemonType.WATER]: "#2980EF",
    [PokemonType.GRASS]: "#3FA129",
    [PokemonType.ELECTRIC]: "#FAC001",
    [PokemonType.FLYING]: "#9BB4E8",
    [PokemonType.FIGHTING]: "#FF8001",
    [PokemonType.PSYCHIC]: "#F85888",
    [PokemonType.DARK]: "#624D4E",
    [PokemonType.GHOST]: "#6F4170",
    [PokemonType.ICE]: "#3CCEF3",
    [PokemonType.BUG]: "#91A019",
    [PokemonType.GROUND]: "#915120",
    [PokemonType.ROCK]: "#AFA981",
    [PokemonType.STEEL]: "#60A1B8",
    [PokemonType.POISON]: "#9141CB",
    [PokemonType.DRAGON]: "#5061E1",
    [PokemonType.FAIRY]: "#EF70EF"
};


interface TypeInfo {
    weak_against: PokemonType[];
    strong_against: PokemonType[];
    resistant_to: PokemonType[];
    weak_to: PokemonType[];
    immune_to: PokemonType[];
    no_effect_on: PokemonType[];
}

const typeMap: Record<PokemonType, TypeInfo> = {
    [PokemonType.NORMAL]: {
        weak_against: [PokemonType.FIGHTING],
        strong_against: [],
        resistant_to: [],
        weak_to: [PokemonType.ROCK, PokemonType.STEEL],
        immune_to: [PokemonType.GHOST],
        no_effect_on: [PokemonType.GHOST],
    },
    [PokemonType.FIGHTING]: {
        weak_against: [PokemonType.FLYING, PokemonType.PSYCHIC, PokemonType.FAIRY],
        strong_against: [PokemonType.NORMAL, PokemonType.ROCK, PokemonType.STEEL, PokemonType.ICE, PokemonType.DARK],
        resistant_to: [PokemonType.ROCK, PokemonType.BUG, PokemonType.DARK],
        weak_to: [PokemonType.FLYING, PokemonType.POISON, PokemonType.PSYCHIC, PokemonType.BUG, PokemonType.FAIRY],
        immune_to: [],
        no_effect_on: [PokemonType.GHOST],
    },
    [PokemonType.FLYING]: {
        weak_against: [PokemonType.ROCK, PokemonType.ELECTRIC, PokemonType.ICE],
        strong_against: [PokemonType.FIGHTING, PokemonType.ROCK, PokemonType.GRASS],
        resistant_to: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.GRASS],
        weak_to: [PokemonType.ROCK, PokemonType.STEEL, PokemonType.ELECTRIC],
        immune_to: [PokemonType.GROUND],
        no_effect_on: [],
    },
    [PokemonType.POISON]: {
        weak_against: [PokemonType.GROUND, PokemonType.PSYCHIC],
        strong_against: [PokemonType.GRASS, PokemonType.FAIRY],
        resistant_to: [PokemonType.FIGHTING, PokemonType.POISON, PokemonType.BUG, PokemonType.GRASS, PokemonType.FAIRY],
        weak_to: [PokemonType.POISON, PokemonType.GROUND, PokemonType.GRASS, PokemonType.GHOST],
        immune_to: [],
        no_effect_on: [PokemonType.STEEL],
    },
    [PokemonType.GROUND]: {
        weak_against: [PokemonType.WATER, PokemonType.GRASS, PokemonType.ICE],
        strong_against: [PokemonType.POISON, PokemonType.ROCK, PokemonType.STEEL, PokemonType.FIRE, PokemonType.ELECTRIC],
        resistant_to: [PokemonType.POISON, PokemonType.ROCK],
        weak_to: [PokemonType.BUG, PokemonType.GRASS],
        immune_to: [PokemonType.ELECTRIC],
        no_effect_on: [PokemonType.FLYING],
    },
    [PokemonType.ROCK]: {
        weak_against: [PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.STEEL, PokemonType.WATER, PokemonType.GRASS],
        strong_against: [PokemonType.FLYING, PokemonType.BUG, PokemonType.FIRE, PokemonType.ICE],
        resistant_to: [PokemonType.NORMAL, PokemonType.FLYING, PokemonType.POISON, PokemonType.FIRE],
        weak_to: [PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.STEEL],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.BUG]: {
        weak_against: [PokemonType.FLYING, PokemonType.ROCK, PokemonType.FIRE],
        strong_against: [PokemonType.GRASS, PokemonType.PSYCHIC, PokemonType.DARK],
        resistant_to: [PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.GRASS],
        weak_to: [PokemonType.FIGHTING, PokemonType.FLYING, PokemonType.POISON, PokemonType.GHOST, PokemonType.STEEL, PokemonType.FIRE, PokemonType.FAIRY],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.GHOST]: {
        weak_against: [PokemonType.GHOST, PokemonType.DARK],
        strong_against: [PokemonType.GHOST, PokemonType.PSYCHIC],
        resistant_to: [PokemonType.POISON, PokemonType.BUG],
        weak_to: [PokemonType.DARK],
        immune_to: [PokemonType.FIGHTING, PokemonType.NORMAL],
        no_effect_on: [PokemonType.NORMAL],
    },
    [PokemonType.STEEL]: {
        weak_against: [PokemonType.FIGHTING, PokemonType.GROUND, PokemonType.FIRE],
        strong_against: [PokemonType.ROCK, PokemonType.ICE, PokemonType.FAIRY],
        resistant_to: [
            PokemonType.NORMAL, PokemonType.FLYING, PokemonType.ROCK, PokemonType.BUG, PokemonType.STEEL,
            PokemonType.GRASS, PokemonType.PSYCHIC, PokemonType.ICE, PokemonType.DRAGON, PokemonType.FAIRY
        ],
        weak_to: [PokemonType.STEEL, PokemonType.FIRE, PokemonType.WATER, PokemonType.ELECTRIC],
        immune_to: [PokemonType.POISON],
        no_effect_on: [],
    },
    [PokemonType.FIRE]: {
        weak_against: [PokemonType.GROUND, PokemonType.ROCK, PokemonType.WATER],
        strong_against: [PokemonType.BUG, PokemonType.STEEL, PokemonType.GRASS, PokemonType.ICE],
        resistant_to: [PokemonType.BUG, PokemonType.STEEL, PokemonType.FIRE, PokemonType.GRASS, PokemonType.ICE, PokemonType.FAIRY],
        weak_to: [PokemonType.ROCK, PokemonType.FIRE, PokemonType.WATER, PokemonType.DRAGON],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.WATER]: {
        weak_against: [PokemonType.GRASS, PokemonType.ELECTRIC],
        strong_against: [PokemonType.GROUND, PokemonType.ROCK, PokemonType.FIRE],
        resistant_to: [PokemonType.STEEL, PokemonType.FIRE, PokemonType.WATER, PokemonType.ICE],
        weak_to: [PokemonType.WATER, PokemonType.GRASS, PokemonType.DRAGON],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.GRASS]: {
        weak_against: [PokemonType.FLYING, PokemonType.POISON, PokemonType.BUG, PokemonType.FIRE, PokemonType.ICE],
        strong_against: [PokemonType.GROUND, PokemonType.ROCK, PokemonType.WATER],
        resistant_to: [PokemonType.GROUND, PokemonType.WATER, PokemonType.GRASS, PokemonType.ELECTRIC],
        weak_to: [PokemonType.FLYING, PokemonType.POISON, PokemonType.BUG, PokemonType.STEEL, PokemonType.FIRE, PokemonType.GRASS, PokemonType.DRAGON],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.ELECTRIC]: {
        weak_against: [PokemonType.GROUND],
        strong_against: [PokemonType.FLYING, PokemonType.WATER],
        resistant_to: [PokemonType.FLYING, PokemonType.STEEL, PokemonType.ELECTRIC],
        weak_to: [PokemonType.GRASS, PokemonType.ELECTRIC, PokemonType.DRAGON],
        immune_to: [],
        no_effect_on: [PokemonType.GROUND],
    },
    [PokemonType.PSYCHIC]: {
        weak_against: [PokemonType.BUG, PokemonType.GHOST, PokemonType.DARK],
        strong_against: [PokemonType.FIGHTING, PokemonType.POISON],
        resistant_to: [PokemonType.FIGHTING, PokemonType.PSYCHIC],
        weak_to: [PokemonType.STEEL, PokemonType.PSYCHIC],
        immune_to: [],
        no_effect_on: [PokemonType.DARK],
    },
    [PokemonType.ICE]: {
        weak_against: [PokemonType.FIGHTING, PokemonType.ROCK, PokemonType.STEEL, PokemonType.FIRE],
        strong_against: [PokemonType.FLYING, PokemonType.GROUND, PokemonType.GRASS, PokemonType.DRAGON],
        resistant_to: [PokemonType.ICE],
        weak_to: [PokemonType.STEEL, PokemonType.FIRE, PokemonType.WATER, PokemonType.ICE],
        immune_to: [],
        no_effect_on: [],
    },
    [PokemonType.DRAGON]: {
        weak_against: [PokemonType.ICE, PokemonType.DRAGON, PokemonType.FAIRY],
        strong_against: [PokemonType.DRAGON],
        resistant_to: [PokemonType.FIRE, PokemonType.WATER, PokemonType.GRASS, PokemonType.ELECTRIC],
        weak_to: [PokemonType.STEEL],
        immune_to: [],
        no_effect_on: [PokemonType.FAIRY],
    },
    [PokemonType.DARK]: {
        weak_against: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.FAIRY],
        strong_against: [PokemonType.GHOST, PokemonType.PSYCHIC],
        resistant_to: [PokemonType.GHOST, PokemonType.DARK],
        weak_to: [PokemonType.FIGHTING, PokemonType.DARK, PokemonType.FAIRY],
        immune_to: [PokemonType.PSYCHIC],
        no_effect_on: [],
    },
    [PokemonType.FAIRY]: {
        weak_against: [PokemonType.POISON, PokemonType.STEEL],
        strong_against: [PokemonType.FIGHTING, PokemonType.DRAGON, PokemonType.DARK],
        resistant_to: [PokemonType.FIGHTING, PokemonType.BUG, PokemonType.DARK],
        weak_to: [PokemonType.POISON, PokemonType.STEEL, PokemonType.FIRE],
        immune_to: [PokemonType.DRAGON],
        no_effect_on: [],
    },
};

export function getTypeDefenses(type1: PokemonType, type2: PokemonType | null) {
    const res: TypeDefences = {
        x0: [],
        x1_4: [],
        x1_2: [],
        x2: [],
        x4: []
    }
    if (!type2) {
        res.x0 = typeMap[type1].immune_to
        res.x1_2 = typeMap[type1].resistant_to
        res.x2 = typeMap[type1].weak_against
        return res
    }

    const type1Immune = typeMap[type1].immune_to
    const type1Resis = typeMap[type1].resistant_to
    const type1Weak = typeMap[type1].weak_against
    const type2Immune = typeMap[type2].immune_to
    const type2Resis = typeMap[type2].resistant_to
    const type2Weak = typeMap[type2].weak_against

    for (const type of Object.values(PokemonType)) {
        if (type1Weak.includes(type) && type2Weak.includes(type)) {
            res.x4.push(type)
        } else if (type1Resis.includes(type) && type2Resis.includes(type)) {
            res.x1_4.push(type)
        } else if (type1Immune.includes(type) || type2Immune.includes(type)) {
            res.x0.push(type)
        } else if (type1Weak.includes(type) && !type2Resis.includes(type)) {
            res.x2.push(type)
        } else if (type2Weak.includes(type) && !type1Resis.includes(type)) {
            res.x2.push(type)
        } else if (type1Resis.includes(type) && !type2Weak.includes(type)) {
            res.x1_2.push(type)
        } else if (type2Resis.includes(type) && !type1Weak.includes(type)) {
            res.x1_2.push(type)
        }
    }

    return res

}