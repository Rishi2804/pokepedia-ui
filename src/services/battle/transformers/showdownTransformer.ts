import {PokemonTeam, TeamMove} from "../../../global/types.ts";
import {PokemonShowdownMember} from "../../../pages/BattleSimulator/types.ts";

export function makeShowdownTeam(
    team: PokemonTeam,
    gen: number = 9
): PokemonShowdownMember[] {
    const showdownTeam: PokemonShowdownMember[] = [];
    const genderMap: Record<string, "M" | "F" | "N"> = {
        "male": "M",
        "female": "F",
        "genderless": "N",
    };
    team.pokemon.forEach((pokemon) => {
        const moves: string[] = pokemon.moves
            .filter((m): m is TeamMove => m !== null)
            .map((m) => m.name);

        const member: PokemonShowdownMember = {
            name: pokemon.name,
            species: pokemon.name, // adjust if you distinguish nickname vs species
            ability: pokemon.ability.name,
            moves,
            gender: genderMap[pokemon.gender],
            level: 100,
            happiness: 255,
            nature: "Serious",
            // default EVs (can be customized later)
            evs: {
                hp: 1,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0,
            },

            // default IVs (perfect)
            ivs: {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31,
            },
        };

        // Optional fields
        if (gen >= 9 && pokemon.teraType) {
            member.teraType = pokemon.teraType;
        }

        if (gen >= 8) {
            member.gigantamax = false
            member.dynamaxLevel = 10
        }

        showdownTeam.push(member);
    });

    return showdownTeam;
}