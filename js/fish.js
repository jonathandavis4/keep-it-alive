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

        this.x = random(0, canvas_width);
        this.y = random(0, canvas_height);
    }

    draw() {
        draw_image(this.canvas, this.canvas.width, this.canvas.height, this.x, this.y, 2);
    }
}