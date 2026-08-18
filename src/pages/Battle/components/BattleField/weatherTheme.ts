// Weather/terrain condition ids straight from pokemon-showdown's
// data/conditions.ts and data/moves.ts (verified against that repo - e.g.
// gen 9's "snow" weather is id `snowscape`, not `snow`). Gradients are
// translucent so they read correctly composited over either theme's base
// scene gradient rather than needing their own light/dark variants.
export const WEATHER_GRADIENT: Record<string, string> = {
    sunnyday: 'linear-gradient(180deg, rgba(255,176,59,0.35), rgba(255,176,59,0) 60%)',
    desolateland: 'linear-gradient(180deg, rgba(255,90,30,0.45), rgba(255,90,30,0) 60%)',
    raindance: 'linear-gradient(180deg, rgba(60,120,220,0.35), rgba(60,120,220,0) 60%)',
    primordialsea: 'linear-gradient(180deg, rgba(30,80,200,0.45), rgba(30,80,200,0) 60%)',
    sandstorm: 'linear-gradient(180deg, rgba(200,170,90,0.4), rgba(200,170,90,0) 60%)',
    hail: 'linear-gradient(180deg, rgba(150,220,240,0.35), rgba(150,220,240,0) 60%)',
    snowscape: 'linear-gradient(180deg, rgba(210,235,245,0.45), rgba(210,235,245,0) 60%)',
    deltastream: 'linear-gradient(180deg, rgba(120,140,200,0.35), rgba(120,140,200,0) 60%)',
};

export const TERRAIN_COLOR: Record<string, string> = {
    electricterrain: '#e8d23f',
    grassyterrain: '#4f9e4f',
    mistyterrain: '#e0a3d6',
    psychicterrain: '#d76fa0',
};
