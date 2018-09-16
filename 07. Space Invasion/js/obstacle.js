class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    show() {
        fill(249, 16, 10);
        stroke(255);
        image(s2, this.x, this.y, this.width, this.height);
    }

    update(boolean) {
        if (boolean){
            this.y += 2;
        }
        this.show();
    }
}