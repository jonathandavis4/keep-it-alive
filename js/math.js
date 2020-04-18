function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_distance(x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.abs(Math.sqrt(dx * dx + dy * dy));
}
