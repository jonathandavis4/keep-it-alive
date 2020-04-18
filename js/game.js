class Game {
    constructor() {
        this.tank = new Tank();

        let initial_fish_count = 40;
        this.fish = [];
        for (let i = 0; i < initial_fish_count; i++) {
            this.fish.push(new Fish(this.tank));
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

    draw_background() {

    }

    draw_controls() {

    }

    draw() {
        this.draw_background();
        this.draw_controls();
        this.tank.draw();
        this.fish.forEach(f => f.draw());
    }
}