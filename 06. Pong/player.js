class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 100;
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.y = y;
        this.x = x;

        if (this.y + this.height >= height) {
            this.y = height - this.height;
        }
        else if (this.y < 0){
            this.y = 0;
        }
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

}