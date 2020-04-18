class Game {
    constructor() {
        this.tank = new Tank();

        let initial_fish_count = 10;
        this.fish = [];
        for (let i = 0; i < initial_fish_count; i++) {
            this.fish.push(new Fish());
        }
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
        this.fish.forEach(f => f.logic());
    }

    draw() {
        this.tank.draw();
        this.fish.forEach(f => f.draw());
    }
}