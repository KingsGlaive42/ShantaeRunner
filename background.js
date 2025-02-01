class Background {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./Background.png"); // Load the background image
    }

    update() {
        // No update logic needed since it's static
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1025, 1025);
    }
}
