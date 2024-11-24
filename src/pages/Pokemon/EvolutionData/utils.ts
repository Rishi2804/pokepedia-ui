import {EvolutionLine, TreeNode} from "./types.ts";

export function getEvolutionTree(lines: EvolutionLine[]) {
    // create individual nodes in a map
    const nodeMap = new Map<number, TreeNode>();
    const evolvedPokemon = new Set<number>();

    for (const line of lines) {
        if (!nodeMap.has(line.fromPokemon)) {
            const node = new TreeNode(line.fromPokemon, line.fromDisplay, line.altForm);
            nodeMap.set(line.fromPokemon, node);
        }
        if (!nodeMap.has(line.toPokemon)) {
            const node = new TreeNode(line.toPokemon, line.toDisplay, 0);
            nodeMap.set(line.toPokemon, node);
        }

        evolvedPokemon.add(line.toPokemon);
    }

    // add children
    for (const line of lines) {
        const fromNode = nodeMap.get(line.fromPokemon);
        const toNode = nodeMap.get(line.toPokemon);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fromNode.addChild(toNode, line.details, line.region)
    }

    // Collect all root nodes (nodes that are not evolved from any other Pokémon)
    const rootNodes: TreeNode[] = [];
    for (const [pokemonId, node] of nodeMap) {
        if (!evolvedPokemon.has(pokemonId)) {
            rootNodes.push(node);
        }
    }

    return rootNodes;
}