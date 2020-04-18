class Game {
    constructor() {
        this.tank = new Tank();
    }

    step() {
        if (! running) {
            clearInterval(interval);
            return;
        }

        this.handle_input();
        this.logic();
        this.draw();
    }

    handle_input() {

    }

    logic() {

        this.tank.logic();
    }

    draw() {
        this.tank.draw();
    }
}