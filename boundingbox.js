class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        return this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top;
    };



    // Check if the bounding boxes are overlapping (even a little bit)
    isTouching(oth) {
        // Check if they are at least touching by a small margin
        const margin = 0;  // Define a small margin (e.g., 1 pixel)
        return (
            this.right > oth.left - margin &&
            this.left < oth.right + margin
        );
    }

    overlap(oth) {
        let a_half = {x: this.width / 2, y: this.height / 2};
        let b_half = {x: oth.width / 2, y: oth.height / 2};

        let a_center = {x: this.right - a_half.x, y: this.bottom - a_half.y};
        let b_center = {x: oth.right - b_half.x, y: oth.bottom - b_half.y};

        let ox = a_half.x + b_half.x - Math.abs(a_center.x - b_center.x);
        let oy = a_half.y + b_half.y - Math.abs(a_center.y - b_center.y);

        return {x: ox, y: oy};
    };

    draw(ctx, color = "red") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.left, this.top, this.width, this.height);
    }
}