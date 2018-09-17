class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 2;
    }

    show() {
        fill(249, 16, 10);
        stroke(255);
        image(s2, this.x, this.y, this.width, this.height);
    }

    update(boolean) {
        if (boolean){
            this.speed = random(1, 3);
            this.y += this.speed;
        }
        this.show();
    }
}