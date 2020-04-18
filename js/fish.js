class Fish {
    constructor(tank, species, x_pos, y_pos, age) {
        this.tank = tank;

        this.is_alive = true;

        if (age === undefined) {
            this.age = random(0, 60);
        }
        else {
            this.age = age;
        }
        this.last_bred_age = this.age;

        this.left_canvas = document.createElement('canvas');
        this.left_canvas.width = 20;
        this.left_canvas.height = 20;
        this.left_canvas_context = this.left_canvas.getContext('2d');

        // Select the fish image.
        let fish_image = null;
        if (species === undefined) {
            this.species = random(1, 3);
        }
        else {
            this.species = species;
        }
        fish_image = eval('image_fish_' + this.species);

        // Prepare the image.
        for (let j = 0; j < this.left_canvas.height; j++) {
            for (let i = 0; i < this.left_canvas.width; i++) {
                let index = (20 * j) + i;
                let r = fish_image[index][0];
                let g = fish_image[index][1];
                let b = fish_image[index][2];

                if (r == 0 && g == 255 && b == 0) {
                    this.left_canvas_context.fillStyle = 'rgba(0, 0, 0, 0)';
                    this.left_canvas_context.fillRect(i, j, 1, 1)
                }
                else {
                    this.left_canvas_context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                    this.left_canvas_context.fillRect(i, j, 1, 1);              
                }
            }
        }
        // Replace the magenta parts of the image with unique patterns for each fish.
        let color_canvas = document.createElement('canvas');
        color_canvas.width = 20;
        color_canvas.height = 20;
        let color_canvas_context = color_canvas.getContext('2d');
        color_canvas_context.fillStyle = random_color();
        color_canvas_context.fillRect(0, 0, 20, 20);
        // Add randomly coloured shapes in random places.
        for (let i = 0; i < 10; i++) {
            color_canvas_context.fillStyle = random_color();
            if (random(0, 1) == 0) {
                let x = random(1, 20);
                let y = random(1, 20);
                let w = 20 - x - random(0, 20 - x);
                let h = 20 - y - random(0, 20 - y);
                color_canvas_context.fillRect(x, y, w, h);
            }
            else {
                let x = random(1, 20);
                let y = random(1, 20);
                let radius_x = (20 - x) / 2;
                let radius_y = (20 - y) / 2;
                let rotation = random(0, 360) * Math.PI / 180;
                let from_angle = random(0, 360) * Math.PI / 180;
                let to_angle = from_angle + random(0, 2 * Math.PI - (from_angle));
                color_canvas_context.beginPath();
                color_canvas_context.ellipse(
                    x, y,
                    radius_x, radius_y,
                    rotation,
                    from_angle, to_angle
                );
                color_canvas_context.fill();
            }
        }
        // Copy the generated colors to the fish image.
        for (let j = 0; j < this.left_canvas.height; j++) {
            for (let i = 0; i < this.left_canvas.width; i++) {
                let new_color = color_canvas_context.getImageData(i, j, 1, 1).data;
                let current_color = this.left_canvas_context.getImageData(i, j, 1, 1).data;
                if (current_color[0] == 255 && current_color[1] == 0 && current_color[2] == 255) {
                    this.left_canvas_context.fillStyle = 'rgb(' + new_color[0] + ', ' + new_color[1] + ', ' + new_color[2] + ')';
                    this.left_canvas_context.fillRect(i, j, 1, 1);
                }
            }
        }

        if (x_pos === undefined) {
            this.x = random(30, this.tank.width - 30);
            this.y = random(30, this.tank.height - 30);
        }
        else {
            this.x = x_pos;
            this.y = y_pos;
        }

        this.max_x_velocity = 20;
        this.min_x_velocity = -20;
        this.min_y_velocity = -5;
        this.max_y_velocity = 5;
        this.x_velocity = random(this.min_x_velocity, this.max_x_velocity);
        this.y_velocity = random(this.min_y_velocity, this.max_y_velocity);

        // Generate the mirrored image.
        this.right_canvas = document.createElement('canvas');
        this.right_canvas.width = 20;
        this.right_canvas.height = 20;
        this.right_canvas_context = this.right_canvas.getContext('2d');
        this.right_canvas_context.scale(-1, 1);
        this.right_canvas_context.translate(-this.right_canvas.width, 0)
        this.right_canvas_context.drawImage(this.left_canvas, 0, 0, this.right_canvas.width, this.right_canvas.height);
        
        // Generate the left dead fish image.
        this.dead_left_canvas = document.createElement('canvas');
        this.dead_left_canvas.width = 20;
        this.dead_left_canvas.height = 20;
        this.dead_left_context = this.dead_left_canvas.getContext('2d');
        for (let j = 0; j < this.left_canvas.height; j++) {
            for (let i = 0; i < this.left_canvas.width; i++) {
                let current_color = this.left_canvas_context.getImageData(i, j, 1, 1).data;
                if (current_color[3] == 0) {
                    this.dead_left_context.fillStyle = 'rgba(0, 0, 0, 0)';
                }
                else {
                    let r = current_color[0] / 3;
                    let g = current_color[1] / 4;
                    let b = current_color[2] / 4;
                    this.dead_left_context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                }
                this.dead_left_context.fillRect(i, j, 1, 1);
            }
        }

        // Generate the mirrored dead image.
        this.dead_right_canvas = document.createElement('canvas');
        this.dead_right_canvas.width = 20;
        this.dead_right_canvas.height = 20;
        this.dead_right_canvas_context = this.dead_right_canvas.getContext('2d');
        this.dead_right_canvas_context.scale(-1, 1);
        this.dead_right_canvas_context.translate(-this.right_canvas.width, 0)
        this.dead_right_canvas_context.drawImage(this.dead_left_canvas, 0, 0, this.dead_right_canvas.width, this.dead_right_canvas.height);
    }

    has_recently_bred() {
        return this.age < this.last_bred_age + 2;
    }

    logic() {
        // Aging.
        this.age += 0.1;

        // Death.
        if (this.is_alive) {
            // Due to age.
            let chance_of_dying = Math.exp((this.age - 100) / 5) * 100;
            if (random(1, 100) < chance_of_dying) {
                this.is_alive = false;
            }

            // Due to lack of oxygen.
            if (this.tank.oxygen_level < 60) {
                let chance_of_dying = 1 / this.tank.oxygen_level * 100;
                if (random(0, 100) < chance_of_dying) {
                    this.is_alive = false;
                }
            }
        }

        // Movement.
        if (this.is_alive) {
            this.move()
        }
        else {
            this.move_to_top();
        }
    }

    move_to_top() {
        if (this.y > this.tank.top_space + 20) {
            this.y -= 3;
        }
    }

    move() {
        this.x += this.x_velocity;
        this.y += this.y_velocity;

        this.x_velocity += random(-2, 2);
        if (this.x_velocity < this.min_x_velocity) {
            this.x_velocity = this.min_x_velocity;
        }
        else if (this.x_velocity > this.max_x_velocity) {
            this.x_velocity = this.max_x_velocity;
        }

        this.y_velocity += random(-1, 1);
        if (this.y_velocity < this.min_y_velocity) {
            this.y_velocity = this.min_y_velocity;
        }
        else if (this.y_velocity > this.max_y_velocity) {
            this.y_velocity = this.max_y_velocity;
        }

        if (this.x < 40) {
            this.x = 40;
            this.x_velocity = 0;
        }
        else if (this.x > this.tank.width - 40) {
            this.x = this.tank.width - 40;
            this.x_velocity = 0;
        }

        if (this.y < this.tank.top_space + 40) {
            this.y = this.tank.top_space + 40;
            this.y_velocity = 0;
        }
        else if (this.y > this.tank.height) {
            this.y = this.tank.height;
            this.y_velocity = 0;
        }
    }

    draw() {
        if (this.is_alive) {
            if (this.x_velocity > 0) {
                draw_image(this.right_canvas, this.right_canvas.width, this.right_canvas.height, this.x, this.y, (this.age / 50) + 1);
            }
            else {
                draw_image(this.left_canvas, this.left_canvas.width, this.left_canvas.height, this.x, this.y, (this.age / 50) + 1);
            }
        }
        else {
            if (this.x_velocity > 0) {
                draw_image(this.dead_right_canvas, this.dead_right_canvas.width, this.dead_right_canvas.height, this.x, this.y, (this.age / 50) + 1);
            }
            else {
                draw_image(this.dead_left_canvas, this.dead_left_canvas.width, this.dead_left_canvas.height, this.x, this.y, (this.age / 50) + 1);
            }
        }
    }
}