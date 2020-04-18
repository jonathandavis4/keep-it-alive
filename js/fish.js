class Fish {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 20;
        this.canvas.height = 20;
        this.context = this.canvas.getContext('2d');

        // Prepare the image.
        for (let j = 0; j < this.canvas.height; j++) {
            for (let i = 0; i < this.canvas.width; i++) {
                let index = (20 * j) + i;
                let r = image_fish_1[index][0];
                let g = image_fish_1[index][1];
                let b = image_fish_1[index][2];

                if (r == 0 && g == 255 && b == 0) {
                    this.context.fillStyle = 'rgba(0, 0, 0, 0)';
                    this.context.fillRect(i, j, 1, 1)
                }
                else {
                    this.context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                    this.context.fillRect(i, j, 1, 1);              
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
        draw_image(this.canvas, this.canvas.width, this.canvas.height, this.x, this.y, 2);
    }
}