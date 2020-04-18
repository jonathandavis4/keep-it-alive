var context = document.querySelector('canvas').getContext('2d');

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

function random_color() {
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    return 'rgb(' + r + ', ' + g + ', ' + b +')';
}