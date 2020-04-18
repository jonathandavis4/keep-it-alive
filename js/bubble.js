class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(4, 8);
    }

    move() {
        let dx = random(-3, 3);
        this.x += dx;
        this.y -= 4;
    }

    draw() {
        set_color('rgba(255, 255, 255, 0.8)');
        stroke_circle(this.x, this.y, this.radius);
    }
}