class Game {
    constructor() {
        this.mode = 'game-mode';
        this.tank = new Tank();

        let initial_fish_count = 12;
        this.fish = [];
        for (let i = 0; i < initial_fish_count; i++) {
            this.fish.push(new Fish(this.tank));
        }

        // Add buttons.
        this.buttons = [];
        this.buttons.push(new Button('Fix oxygen pump', 110, function() {
            game.tank.air_pump_is_working = true;
        }))
        this.buttons.push(new Button('Remove dead fish', 190, function() {
            let new_fish = [];
            for (let i = 0; i < game.fish.length; i++) {
                let f = game.fish[i];
                if (f.is_alive || (! f.is_alive && f.y > game.tank.top_space + 20)) {
                    new_fish.push(f);
                }
            }
            game.fish = new_fish;
        }))
        this.buttons.push(new Button('Game mode', 520, function() {
            game.mode = 'game-mode';
        }))
        this.buttons.push(new Button('Relaxation mode', 560, function() {
            game.mode = 'relax-mode';
        }))

        document.querySelector('canvas').addEventListener('mousedown', function(e) {
            for (let i = 0; i < game.buttons.length; i++) {
                let button = game.buttons[i];
                if (button.check_click(e)) {
                    button.onmousedown();
                }
            }
        })
    }

    step() {
        if (! running) {
            clearInterval(interval);
            return;
        }

        this.logic();
        this.draw();
    }

    logic() {
        this.tank.logic();
        this.fish.forEach(f => f.logic());

        // Check for fish breeding.
        if (this.mode == 'game-mode') {
            let new_fish = [];
            for (let i = 0; i < this.fish.length; i++) {
                for (let j = 0; j < this.fish.length; j++) {
                    if (j <= i) {
                        continue;
                    }

                    let fish_1 = this.fish[i];
                    let fish_2 = this.fish[j];

                    if (fish_1.is_alive && fish_2.is_alive) {
                        if (fish_1.species == fish_2.species) {
                            if (fish_1.age > 5 && fish_2.age > 5) {
                                if (! fish_1.has_recently_bred() && ! fish_2.has_recently_bred()) {
                                    if (get_distance(fish_1.x, fish_1.y, fish_2.x, fish_2.y) < 30) {
                                        if (random(0, 4) < 1) {
                                            new_fish.push(
                                                new Fish(
                                                    this.tank,
                                                    fish_1.species,
                                                    Math.floor((fish_1.x + fish_2.x) / 2),
                                                    Math.floor((fish_1.y + fish_2.y) / 2),
                                                    0
                                                )
                                            )
                                            fish_1.last_bred_age = fish_1.age;
                                            fish_2.last_bred_age = fish_2.age;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            new_fish.forEach(f => this.fish.push(f));
        }
    }

    draw_background() {
        set_color('#aaccff')
        fill_rect(0, 0, canvas_width, canvas_height);
    }

    draw_controls() {
        // Title.
        context.font = 'bold 30px Georgia';
        context.fillStyle = 'black';
        context.fillText('Tools', this.tank.width + 55, 50);

        // Oxygen.
        context.font = '20px Georgia';
        context.fillStyle = 'black';
        context.fillText('Oxygen level:', this.tank.width + 6, 100);
        if (this.tank.air_pump_is_working) {
            context.fillStyle = 'darkgreen';
        }
        else {
            context.fillStyle = 'red';
        }
        context.fillText(Math.floor(this.tank.oxygen_level) + '%', this.tank.width + 134, 100);
        
        // Fish alive.
        let alive_fish_count = 0;
        for (let i = 0; i < this.fish.length; i++) {
            if (this.fish[i].is_alive) {
                alive_fish_count += 1;
            }
        }
        context.fillStyle = 'black';
        context.fillText('Alive fish: ' + alive_fish_count + '/' + this.fish.length, this.tank.width + 6, 180);

        // Draw the buttons.
        this.buttons.forEach(button => button.draw());
    }

    draw() {
        this.draw_background();
        this.draw_controls();
        this.tank.draw();
        this.fish.forEach(f => f.draw());
    }
}