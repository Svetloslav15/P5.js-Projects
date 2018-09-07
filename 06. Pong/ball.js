class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.oldY;
        this.position = "straight";
    }

    show() {
        fill(0);
        ellipse(this.x, this.y, this.width, this.width);
    }

    update() {
        this.oldY = this.y;
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y < this.oldY){
            this.direction = "down";
        }
        else{
            this.direction = "up";
        }
        if (this.x >= width) {
            myScore++;
            this.x = width / 2;
            this.xSpeed = -10;
        }
        else if (this.x < 0) {
            this.x = width / 2;
            opponentScore++;
        }
        else if (me.x + me.width + this.width >= this.x) {
            if (this.y >= me.y && this.y <= me.y + 50){
                this.xSpeed = 10;
            }
            else if (this.y > me.y + 50 && this.y <= me.y + me.height){
                this.xSpeed = 10;
            }
        }
        else if (opponent.x - this.width <= this.x){
            if (this.y >= opponent.y && this.y <= opponent.y + 50){
                this.xSpeed = -10;
            }
            else if (this.y > opponent.y + 50 && this.y <= opponent.y + opponent.height){
                this.xSpeed = -10;
            }
        }

        if (this.direction === "down"){
            this.ySpeed = -5
        }
        else if (this.direction === "up"){
            this.ySpeed = 5;
        }

        if (this.y <= 0){
            this.ySpeed = 5;
        }
        else if (this.y >= height){
            this.ySpeed = -5;
        }

        this.show();
    }

}