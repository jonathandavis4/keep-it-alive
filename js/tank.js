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

        this.air_pump_x = random(75, this.width - 50);
        this.air_pump_is_working = true;
        this.bubbles = [];
        this.oxygen_level = 100;

        this.plants = [];
        let plant_count = random(3, 10);
        for (let i = 0; i < plant_count; i++) {
            this.plants.push(
                new Plant(
                    random(20, this.width - 20),
                    this.height - 20 + this.top_space
                )
            );
        }
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

        // Logic for the air pump.
        if (random(0, 200) < 1) {
            this.air_pump_is_working = false;
        }
        if (this.air_pump_is_working) {
            if (random(0, 10) < 4) {
                this.bubbles.push(new Bubble(this.air_pump_x, this.height - 40 + this.top_space));
            }
            this.oxygen_level += 0.1;
        }
        else {
            this.oxygen_level -= 0.5;
        }
        if (this.oxygen_level < 0) {
            this.oxygen_level = 0;
        }
        if (this.oxygen_level > 100) {
            this.oxygen_level = 100;
        }

        this.bubbles.forEach(bubble => bubble.move());
        // Remove bubbles which have left the water.
        let new_bubbles = [];
        this.bubbles.forEach(function(bubble) {
            if (bubble.y >= 60) {
                new_bubbles.push(bubble);
            }
        })
        this.bubbles = new_bubbles;
    }

    draw() {
        // Draw the water.
        set_color('rgb(' + this.water_color[0] + ', ' + this.water_color[1] + ', ' + this.water_color[2] + ')');
        fill_rect(15, 15 + this.top_space, this.width - 15, this.height - 15 + this.top_space);

        // Draw the air pump.
        set_color('rgba(255, 255, 255, 0.2)');
        fill_rect(this.air_pump_x - 25, 400, this.air_pump_x + 25, this.height - 10 + this.top_space);

        // Draw the bubbles.
        this.bubbles.forEach(bubble => bubble.draw());

        // Draw the plants.
        this.plants.forEach(plant => plant.draw());

        // Draw the tank.
        let brown = '#3c0f0c';
        set_color(brown);
        fill_rect(10, 10, 15, this.height + 30);  // Left.
        fill_rect(this.width - 15, 10, this.width - 10, this.height + 30);  // Right.
        fill_rect(10, this.height - 15 + this.top_space, this.width - 10, this.height - 10 + this.top_space);  // Bottom.
    }
}