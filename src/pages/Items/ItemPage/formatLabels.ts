// Display labels for the battle formats an item can be legal in. The keys are
// the BattleFormatKey values the API sends in `legalFormats`.
export function formatLabel(format: string): string {
    switch (format) {
        case "nationaldex":
            return "National Dex";
        case "legendsza":
            return "Legends: Z-A";
        default:
            return `Gen ${format}`;
    }
}
