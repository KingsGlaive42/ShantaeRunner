const GrassWidth = 15;

class GrassFloor {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets.png");
        this.scale = 5;
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 33, 0, 15, 15, this.x, 100, 50, 50);
        ctx.drawImage(
            this.spritesheet,       // The spritesheet
            48, 0,                  // Source x, y (top-left corner of the tile in the spritesheet)
            15, 15,// Source width and height (size of the tile)
            this.x * (GrassWidth * this.scale), // Destination x (shifted by i * TILE_WIDTH to make a row of tiles)
            this.y,                    // Destination y (fixed y-coordinate, as you're drawing a floor)
            15 * this.scale, 15 * this.scale // Destination width and height (size of the tile on canvas)
        );
        this.BB.draw(ctx);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * (GrassWidth * this.scale), this.y, 15 * this.scale, 15 * this.scale);
    };
}

const WaterWidth = 15;

class Water {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets.png");
        this.scale = 5;
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {
        ctx.drawImage(
            this.spritesheet,       // The spritesheet
            144, 32,                  // Source x, y (top-left corner of the tile in the spritesheet)
            15, 15,// Source width and height (size of the tile)
            this.x * (WaterWidth * this.scale), // Destination x (shifted by i * TILE_WIDTH to make a row of tiles)
            this.y,                    // Destination y (fixed y-coordinate, as you're drawing a floor)
            15 * this.scale, 15 * this.scale // Destination width and height (size of the tile on canvas)
        );
        this.BB.draw(ctx);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * (WaterWidth * this.scale), this.y, 15 * this.scale, 15 * this.scale);
    };
}

const AirWidth = 15;

class Air {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets.png");
        this.scale = 5;
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {
        ctx.drawImage(
            this.spritesheet,       // The spritesheet
            0, 0,                  // Source x, y (top-left corner of the tile in the spritesheet)
            15, 15,// Source width and height (size of the tile)
            this.x * (AirWidth * this.scale), // Destination x (shifted by i * TILE_WIDTH to make a row of tiles)
            this.y,                    // Destination y (fixed y-coordinate, as you're drawing a floor)
            15 * this.scale, 15 * this.scale // Destination width and height (size of the tile on canvas)
        );
        this.BB.draw(ctx);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * (AirWidth * this.scale), this.y, 15 * this.scale, 15 * this.scale);
    };
}

const DirtWidth = 15;

class Dirt {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets.png");
        this.scale = 5;
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 33, 0, 15, 15, this.x, 100, 50, 50);
        ctx.drawImage(
            this.spritesheet,       // The spritesheet
            48, 16,                  // Source x, y (top-left corner of the tile in the spritesheet)
            15, 15,// Source width and height (size of the tile)
            this.x * (DirtWidth * this.scale), // Destination x (shifted by i * TILE_WIDTH to make a row of tiles)
            this.y,                    // Destination y (fixed y-coordinate, as you're drawing a floor)
            15 * this.scale, 15 * this.scale // Destination width and height (size of the tile on canvas)
        );
        this.BB.draw(ctx);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * (DirtWidth * this.scale), this.y, 15 * this.scale, 15 * this.scale);
    };
}