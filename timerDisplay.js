class TimerDisplay {
    constructor(game) {
        this.game = game;
        this.timeElapsed = 0;  // Time in seconds
        this.startTime = Date.now();  // Track when the timer started
        this.font = "30px Arial";  // Font for the timer text
    }

    update() {
        // Update the elapsed time based on the current time and start time
        this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000); // Time in seconds
    }

    draw(ctx) {
        // Draw the timer in the top-right corner of the canvas
        ctx.font = this.font;
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.fillText("Time: " + this.timeElapsed + "s", ctx.canvas.width - 10, 30);
    }
}
