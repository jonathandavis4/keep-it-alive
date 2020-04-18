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
});
