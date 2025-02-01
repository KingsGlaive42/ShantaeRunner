
const TILE_MAP = {
    0: { x: 0,  y: 0 },   // Empty space (air)
    1: { x: 144, y: 32 },   // Water
    2: { x: 48, y: 16 },   // Dirt
    3: { x: 47, y: 160 },   // CaveFloor
    5: { x: 80, y: 160 },  // Grass to Cave
    6: { x: 16, y: 160 }   // Cave to Grass
};

const one = {
    GrassFloor: [{ x: 0, y: 600, w: 20}, { x: 28, y: 600, w: 20}],
    Water: [{ x: 20, y: 600, w: 8}, { x: 20, y: 675, w: 8}, { x: 20, y: 750, w: 8}],
    Dirt: [{ x: 0, y: 675, w: 20}, { x: 28, y: 675, w: 20}, { x: 0, y: 750, w: 20}, { x: 28, y: 750, w: 20},
           { x: 10, y: 430, w: 5, h: 10}, { x: 37, y: 430, w: 5, h: 10}],
    Air: [{ x: 48, y: 600, w: 10}],
};