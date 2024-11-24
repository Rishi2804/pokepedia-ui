export interface EvolutionLine {
    id: number;
    fromPokemon: number;
    fromDisplay: string;
    toPokemon: number;
    toDisplay: string;
    details: string[];
    region: string | null;
    altForm: number;
}

export interface TreeEdge {
    child: TreeNode;
    details: string[];
    region: string | null;
}

export class TreeNode {
    pokemonId: number;
    pokemonName: string;
    altForm: number;
    edges: TreeEdge[]

    constructor(id: number, name: string, form: number) {
        this.pokemonId = id;
        this.pokemonName = name;
        this.altForm = form;
        this.edges = [];
    }

    addChild(node: TreeNode, details: string[], region: string | null) {
        this.edges.push({ child: node, details: details, region: region });
    }
}