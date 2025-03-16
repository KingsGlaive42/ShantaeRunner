class shantae {
    constructor(game) {
        this.game = game;
        this.x = 50;
        this.y = -300;
        this.speed = 20;
        this.isOffset = false;
        this.dead = false;
        this.win = false;
        this.updateBB();

        this.animations = {
            Charge : new Animator(ASSET_MANAGER.getAsset("./ShantaeCharge.png"), 0, 0, 230, 110, 8, 0.06, false, true),
            GlideStart : new Animator(ASSET_MANAGER.getAsset("./ShantaeGlide.png"), 0, 0, 213, 251, 6, 0.06, false, false),
            Glide : new Animator(ASSET_MANAGER.getAsset("./ShantaeGlide.png"), 0, 282, 198, 200, 8, 0.06, false, true),
            GlideEnd : new Animator(ASSET_MANAGER.getAsset("./ShantaeGlide.png"), 0, 513, 213, 251, 6, 0.06, false, false),
            Slide : new Animator(ASSET_MANAGER.getAsset("./ShantaeSlide.png"), 0, 0, 198, 108, 4, 0.06, false, true),
            Jump : new Animator(ASSET_MANAGER.getAsset("./ShantaeJump.png"), 0, 0, 107, 129, 4, 0.06, false, false),
            JumpTuck : new Animator(ASSET_MANAGER.getAsset("./ShantaeJump.png"), 0, 160, 107, 129, 4, 0.06, false, false),
            JumpFall : new Animator(ASSET_MANAGER.getAsset("./ShantaeFall.png"), 0, 0, 122, 167, 4, 0.06, false, true),
        }

        this.currentState = 'JumpFall';
    };

    setState(state) {
        for (let key in this.animations) {
            if (this.currentState === key) {

            } else if (this.animations.hasOwnProperty(key)) {
                // Reset each Animator instance
                this.animations[key].reset();
            }
        }
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error(`State '${state}' not found.`);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.currentState === 'Charge') {
            this.BB = new BoundingBox(this.x + 75, this.y + 10, 70, 98);
        } else if (this.currentState === 'Jump') {
            this.BB = new BoundingBox(this.x + 15, this.y + 9, 65, 120);
        } else if (this.currentState === 'JumpTuck') {
            this.BB = new BoundingBox(this.x + 20, this.y + 9, 67, 115);
        } else if (this.currentState === 'JumpFall') {
            this.BB = new BoundingBox(this.x + 26, this.y + 7, 70, 160);
        } else if (this.currentState === 'Slide') {
            this.BB = new BoundingBox(this.x + 20, this.y + 15, 125, 95);
        } else if (this.currentState === 'GlideStart') {
            this.BB = new BoundingBox(this.x + 32, this.y + 15, 135, 240);
        } else if (this.currentState === 'Glide') {
            this.BB = new BoundingBox(this.x + 20, this.y + 7, 135, 193);
        } else {
            this.BB = new BoundingBox(this.x + 35, this.y + 14, 138, 238);
        }
    }

    update() {
        if (this.game.entities.some(entity => entity instanceof Logo)) {
            return;
        }
        if (this.y > 800) {
            this.dead = true;
        }
        if (this.dead === true) {
            return;
        }

        if (this.game.keys['ArrowUp'] && !(this.currentState === 'Jump'
                || this.currentState === 'JumpTuck' || this.currentState === 'JumpFall'
                || this.currentState === 'GlideStart' || this.currentState === 'Glide'
                || this.currentState === 'GlideEnd')) {
                this.setState('Jump');
            } else if (this.game.keys['Shift'] && (this.currentState === 'Jump'
                || this.currentState === 'JumpTuck' || this.currentState === 'JumpFall'
                || this.currentState === 'GlideStart' || this.currentState === 'Glide')) {
                if (this.currentState === 'GlideStart' && this.animations['GlideStart'].getDone()
                    || this.currentState === 'Glide') {
                    if (!this.isOffset) {
                        this.y = this.y + 50;
                        this.isOffset = true;
                    }
                    this.y += 1;
                    this.setState('Glide');
                } else {
                    this.isOffset = false;
                    this.setState('GlideStart');
                }
            } else if (this.game.keys['ArrowDown'] && this.currentState === 'Charge'
                || this.game.keys['ArrowDown'] && this.currentState === 'Slide') {
                this.setState('Slide');
            } else {
                if (this.currentState === 'Glide' || this.currentState === 'GlideStart') {
                    this.setState('GlideEnd');
                } else {
                    if (this.animations['GlideEnd'].getDone()) {
                        this.setState('JumpFall');
                    } else {
                        if (this.currentState === 'GlideEnd') {
                            this.y += 1;
                        }
                    }
                }
                if (this.currentState === 'Slide') {
                    this.setState('Charge');
                }
                if (this.currentState === 'Jump') {
                    if (this.animations['Jump'].getDone()) {
                        this.setState('JumpTuck');
                    } else {
                        this.y -= this.speed;
                    }
                } else if (this.currentState === 'JumpTuck') {
                    if (this.animations['JumpTuck'].getDone()) {
                        this.setState('JumpFall');
                    }
                } else if (this.currentState === 'JumpFall') {
                    if (this.animations['JumpFall'].getDone()) {
                        this.setState('Charge');
                    } else {
                        this.y += this.speed;
                    }
                }
        }

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Water || entity instanceof Air && (that.currentState === 'Charge' || that.currentState === 'Slide')) {
                    that.setState('JumpFall');
                }
                if (entity instanceof GrassFloor && that.currentState !== 'Charge'
                    && that.currentState !== 'Jump' && that.currentState !== 'Slide') {
                    that.y = entity.y - 107;
                    that.setState('Charge');
                }
                if (entity instanceof Dirt) {
                    that.dead = true;
                }
                if (entity instanceof Win) {
                    that.win = true;
                }
            }
        });
        this.updateBB();
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
}