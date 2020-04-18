class Button {
    constructor(text, y, onmousedown) {
        this.x = 810;
        this.y = y;
        this.width = 170;
        this.height = 30;
        this.text = text;

        this.onmousedown = onmousedown;
    }

    check_click(e) {
        return (
            this.x < e.offsetX &&
            e.offsetX < this.x + this.width &&
            this.y < e.offsetY &&
            e.offsetY < this.y + 32
        );
    }

    draw() {
        context.fillStyle = '#6af';
        fill_rect(this.x, this.y, this.x + this.width, this.y + this.height);
        context.font = '16px Georgia';
        context.fillStyle = 'black';
        context.fillText(this.text, this.x + 20, this.y + 20);
    }
}