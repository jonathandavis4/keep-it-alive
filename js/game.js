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

        this.logic();
        this.draw();
    }

    logic() {
        this.tank.logic();
        this.fish.forEach(f => f.logic());
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
    }

    draw() {
        this.draw_background();
        this.draw_controls();
        this.tank.draw();
        this.fish.forEach(f => f.draw());
    }
}