class Tank {
    constructor() {
        this.water_color_min_red = 30;
        this.water_color_max_red = 70;
        this.water_color_min_green = 80;
        this.water_color_max_green = 120;
        this.water_color_min_blue = 200;
        this.water_color_max_blue = 255;
        this.water_color = [50, 100, 255];

        this.width = canvas_width - 200;
        this.top_space = 40;
        this.height = canvas_height - this.top_space;
    }

    logic() {
        this.water_color = [
            this.water_color[0] + random(-2, 2),
            this.water_color[1] + random(-2, 2),
            this.water_color[2] + random(-2, 2),
        ]
        if (this.water_color[0] < this.water_color_min_red) {
            this.water_color[0] = this.water_color_min_red;
        }
        else if (this.water_color[0] > this.water_color_max_red) {
            this.water_color[0] = this.water_color_max_red;
        }
        if (this.water_color[1] < this.water_color_min_green) {
            this.water_color[1] = this.water_color_min_green;
        }
        else if (this.water_color[1] > this.water_color_max_green) {
            this.water_color[1] = this.water_color_max_green;
        }
        if (this.water_color[2] < this.water_color_min_blue) {
            this.water_color[2] = this.water_color_min_blue;
        }
        else if (this.water_color[2] > this.water_color_max_blue) {
            this.water_color[2] = this.water_color_max_blue;
        }
    }

    draw() {
        // Fill the background.
        set_color('#aaccff')
        fill_rect(0, 0, canvas_width, canvas_height);

        // Draw the water.
        set_color('rgb(' + this.water_color[0] + ', ' + this.water_color[1] + ', ' + this.water_color[2] + ')');
        fill_rect(15, 15 + this.top_space, this.width - 15, this.height - 15 + this.top_space);

        // Draw the tank.
        let brown = '#3c0f0c';
        set_color(brown);
        fill_rect(10, 10, 15, this.height + 30);  // Left.
        fill_rect(this.width - 15, 10, this.width - 10, this.height + 30);  // Right.
        fill_rect(10, this.height - 15 + this.top_space, this.width - 10, this.height - 10 + this.top_space);  // Bottom.
    }
}