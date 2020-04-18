class Game {
    constructor() {
        this.tank = new Tank();

        let initial_fish_count = 10;
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

        this.logic();
        this.draw();
    }

    logic() {
        this.tank.logic();
        this.fish.forEach(f => f.logic());

        // Check for fish breeding.
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
        // Oxygen fix button.
        if (! this.tank.air_pump_is_working) {
            context.fillStyle = '#6af';
            fill_rect(this.tank.width + 10, 110, this.tank.width + 180, 140);
            context.font = '16px Georgia';
            context.fillStyle = 'black';
            context.fillText('Fix oxygen pump', this.tank.width + 34, 130);
        }

        // Remove dead fish.
        let has_dead_fish = false;
        for (let i = 0; i < this.fish.length; i++) {
            if (! this.fish[i].is_alive && this.fish[i].y <= game.tank.top_space + 20) {
                has_dead_fish = true;
                break;
            }
        }
        if (has_dead_fish) {
            context.fillStyle = '#6af';
            fill_rect(this.tank.width + 10, 180, this.tank.width + 180, 210);
            context.font = '16px Georgia';
            context.fillStyle = 'black';
            context.fillText('Remove dead fish', this.tank.width + 34, 200);
        }
    }

    draw() {
        this.draw_background();
        this.draw_controls();
        this.tank.draw();
        this.fish.forEach(f => f.draw());
    }
}