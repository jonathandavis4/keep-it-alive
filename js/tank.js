class Tank {
    constructor() {
        this.water_color_min_red = 30;
        this.water_color_max_red = 70;
        this.water_color_min_green = 80;
        this.water_color_max_green = 120;
        this.water_color_min_blue = 200;
        this.water_color_max_blue = 255;
        this.water_color = [50, 100, 255];
    }

    logic() {
        this.water_color = [
            this.water_color[0] + random(-5, 5),
            this.water_color[1] + random(-5, 5),
            this.water_color[2] + random(-5, 5),
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
        set_color('rgb(' + this.water_color[0] + ', ' + this.water_color[1] + ', ' + this.water_color[2] + ')');
        fill_rect(0, 0, canvas_width, canvas_height);
    }
}