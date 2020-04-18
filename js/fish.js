class Fish {
    constructor() {
        this.left_canvas = document.createElement('canvas');
        this.left_canvas.width = 20;
        this.left_canvas.height = 20;
        this.left_canvas_context = this.left_canvas.getContext('2d');

        // Prepare the image.
        for (let j = 0; j < this.left_canvas.height; j++) {
            for (let i = 0; i < this.left_canvas.width; i++) {
                let index = (20 * j) + i;
                let r = image_fish_1[index][0];
                let g = image_fish_1[index][1];
                let b = image_fish_1[index][2];

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

        this.x = random(30, canvas_width - 30);
        this.y = random(30, canvas_height - 30);

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
    }

    logic() {
        this.move()
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

        if (this.x < 30) {
            this.x = 30;
            this.x_velocity = 0;
        }
        else if (this.x > canvas_width - 30) {
            this.x = canvas_width - 30;
            this.x_velocity = 0;
        }

        if (this.y < 30) {
            this.y = 30;
            this.y_velocity = 0;
        }
        else if (this.y > canvas_height - 30) {
            this.y = canvas_height - 30;
            this.y_velocity = 0;
        }
    }

    draw() {
        if (this.x_velocity > 0) {
            draw_image(this.right_canvas, this.right_canvas.width, this.right_canvas.height, this.x, this.y, 2);
        }
        else {
            draw_image(this.left_canvas, this.left_canvas.width, this.left_canvas.height, this.x, this.y, 2);
        }
    }
}