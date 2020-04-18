var context = document.querySelector('canvas').getContext('2d');
context.imageSmoothingEnabled = false;

function set_color(color){
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineStyle = color;
}

function fill_rect(x1, y1, x2, y2){
    var width = x2 - x1;
    var height = y2 - y1;
    context.fillRect(x1, y1, width, height);
}

function stroke_circle(x, y, radius) {
    context.beginPath();
    context.ellipse(
        x, y,
        radius, radius,
        0,
        0, 2 * Math.PI
    );
    context.stroke();
}

function fill_circle(x, y, radius) {
    let rotation = 0;
    let from_angle = 0;
    let to_angle = 2 * Math.PI;
    context.beginPath();
    context.ellipse(
        x, y,
        radius, radius,
        rotation,
        from_angle, to_angle
    );
    context.fill();
}

function random_color() {
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    return 'rgb(' + r + ', ' + g + ', ' + b +')';
}

function draw_image(source_canvas, source_width, source_height, x, y, scale_factor) {
    context.drawImage(
        source_canvas,
        x - (source_width * scale_factor / 2),
        y - (source_height * scale_factor / 2),
        source_width * scale_factor,
        source_height * scale_factor
    );
}
