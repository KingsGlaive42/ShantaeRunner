class SceneManager {
    constructor(game) {
        this.game = game;
        this.scrollSpeed = 10;

        this.loadLevel(one, 0, 500, false, true)
    }

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, transition, title) {

        this.title = title;
        this.level = level;
        this.clearEntities();

        this.background = new Background(this.game);
        this.shantae = new shantae(this.game)
        this.game.addEntity(this);
        this.timer = new TimerDisplay(this.game);
        this.game.addEntity(this.timer);

        if (this.level.logo) {
            for (let i = 0; i < this.level.logo.length; i++) {
                let logo = level.logo[i];
                this.game.addEntity(new Logo(this.game, logo.x, logo.y));
            }
        }

        if (this.level.GrassFloor) {
            for (let i = 0; i < this.level.GrassFloor.length; i++) {
                let ground = level.GrassFloor[i];
                for (let k = 0; k < ground.w; k++) {
                    this.game.addEntity(new GrassFloor(this.game, ground.x + k, ground.y));
                }
            }
        }
        if (this.level.Water) {
            for (let i = 0; i < this.level.Water.length; i++) {
                let water = level.Water[i];
                for (let k = 0; k < water.w; k++) {
                    this.game.addEntity(new Water(this.game, water.x + k, water.y));
                }
            }
        }
        this.game.addEntity(this.shantae);
        if (this.level.Dirt) {
            for (let i = 0; i < this.level.Dirt.length; i++) {
                let dirt = level.Dirt[i];
                for (let k = 0; k < dirt.w; k++) {
                    this.game.addEntity(new Dirt(this.game, dirt.x + k, dirt.y));
                }
            }
        }

        if (this.level.Air) {
            for (let i = 0; i < this.level.Air.length; i++) {
                let air = level.Air[i];
                for (let k = 0; k < air.w; k++) {
                    this.game.addEntity(new Air(this.game, air.x + k, air.y));
                }
            }
        }
        this.game.addEntity(this.background);
    };


    // Update the current scene
    update() {
        if (this.shantae.dead === true) {
            //this.game.end();
            location.reload(true);
        }

        if (this.game.entities.some(entity => entity instanceof Logo)) {
            this.scrollSpeed = 0;
            this.logo = this.game.entities.find(entity=> entity instanceof Logo);
            if (this.game.keys[" "]) {
                this.logo.removeFromWorld = true;
            }
        } else {
            this.scrollSpeed = (500 * this.game.clockTick) + this.timer.timeElapsed;
        }
        let that = this;
        this.game.entities.forEach(entity => {
            if (!(entity instanceof shantae || entity instanceof TimerDisplay)) {
                entity.x -= that.scrollSpeed / (15 * 5); // Adjusting for scaling
            }
        });
    }

    // Draw the current scene
    draw(ctx) {

    }
}
