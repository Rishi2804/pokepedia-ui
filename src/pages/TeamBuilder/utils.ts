import {VersionGroup} from "../../global/enums.ts";

class BiDirectionalMap<K, V> {
    private keyToValueMap: Map<K, V>;
    private valueToKeyMap: Map<V, K>;

    constructor() {
        this.keyToValueMap = new Map();
        this.valueToKeyMap = new Map();
    }

    // Add a key-value pair in both directions
    set(key: K, value: V): void {
        this.keyToValueMap.set(key, value);
        this.valueToKeyMap.set(value, key);
    }

    // Get value from key
    getByKey(key: K | null | undefined): V | undefined {
        if (!key) return undefined
        return this.keyToValueMap.get(key);
    }

    // Get key from value
    getByValue(value: V): K | undefined {
        return this.valueToKeyMap.get(value);
    }
}

export const versionGroupToStringMap = new BiDirectionalMap<VersionGroup, string>()
versionGroupToStringMap.set(VersionGroup.RED_BLUE, 'red-blue')
versionGroupToStringMap.set(VersionGroup.YELLOW, 'yellow');
versionGroupToStringMap.set(VersionGroup.GOLD_SILVER, 'gold-silver');
versionGroupToStringMap.set(VersionGroup.CRYSTAL, 'crystal');
versionGroupToStringMap.set(VersionGroup.RUBY_SAPPHIRE, 'ruby-sapphire');
versionGroupToStringMap.set(VersionGroup.EMERALD, 'emerald');
versionGroupToStringMap.set(VersionGroup.FIRERED_LEAFGREEN, 'firered-leafgreen');
versionGroupToStringMap.set(VersionGroup.DIAMOND_PEARL, 'diamond-pearl');
versionGroupToStringMap.set(VersionGroup.PLATINUM, 'platinum');
versionGroupToStringMap.set(VersionGroup.HEARTGOLD_SOULSILVER, 'heartgold-soulsilver');
versionGroupToStringMap.set(VersionGroup.BLACK_WHITE, 'black-white');
versionGroupToStringMap.set(VersionGroup.BLACK_2_WHITE_2, 'black-2-white-2');
versionGroupToStringMap.set(VersionGroup.X_Y, 'x-y');
versionGroupToStringMap.set(VersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE, 'omega-ruby-alpha-sapphire');
versionGroupToStringMap.set(VersionGroup.SUN_MOON, 'sun-moon');
versionGroupToStringMap.set(VersionGroup.ULTRA_SUN_ULTRA_MOON, 'ultra-sun-ultra-moon');
versionGroupToStringMap.set(VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE, 'lets-go-pikachu-lets-go-eevee');
versionGroupToStringMap.set(VersionGroup.SWORD_SHIELD, 'sword-shield');
versionGroupToStringMap.set(VersionGroup.BRILLIANT_DIAMOND_AND_SHINING_PEARL, 'brilliant-diamond-and-shining-pearl');
versionGroupToStringMap.set(VersionGroup.LEGENDS_ARCEUS, 'legends-arceus');
versionGroupToStringMap.set(VersionGroup.SCARLET_VIOLET, 'scarlet-violet');