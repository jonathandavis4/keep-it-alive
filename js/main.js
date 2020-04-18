var running = true;
var interval = null;
var game = null;

var canvas_width = null;
var canvas_height = null;

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    canvas_width = document.querySelector('canvas').width;
    canvas_height = document.querySelector('canvas').height;

    game = new Game();
    interval = setInterval(
        function() {
            game.step();
        },
        100
    );

    document.querySelector('canvas').addEventListener('mousedown', function(e) {
        // Oxygen pump button.
        if (
            810 < e.offsetX &&
            e.offsetX < 980 &&
            110 < e.offsetY &&
            e.offsetY < 145
        ) {
            game.tank.air_pump_is_working = true;
        }
    })
});
