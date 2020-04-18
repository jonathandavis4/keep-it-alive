class Plant {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        if (color === undefined) {
            let r = random(0, 150);
            let g = random(150, 255);
            let b = random(0, 150);
            this.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        else {
            this.color = color;
        }

        this.leaves = [];
        let leaf_count = random(0, 2);
        for (let i = 0; i < leaf_count; i++) {
            let new_x = this.x + random(-8, 8);
            let new_y = this.y - 8;
            if (
                new_x < 20 ||
                new_x > 580 ||
                new_y < 60
            ) {
                continue;
            }
            this.leaves.push(
                new Plant(new_x, new_y, this.color)
            )
        }
    }

    draw() {
        set_color(this.color);
        fill_circle(this.x, this.y, 10);

        this.leaves.forEach(leaf => leaf.draw());
    }
}
