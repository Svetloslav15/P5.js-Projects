class Pipe{
    constructor(){
        this.top = random(height / 2);
        this.bottom = height - this.top - 200;
        this.bottomY = this.top + 200;
        this.x = width;
        this.width = 30;
        this.speed = 5;
    }

    show(){
        fill(255);
        image(topPipe, this.x, 0, this.width, this.top);
        image(bottomPipe, this.x, this.bottomY, this.width, this.bottom);
    }

    update(){
        this.x -= this.speed;
    }

    offscreen(){
        if (this.x < -this.width){
            return true;
        }
        return false;
    }

    hits(bird){
        if (bird.y < this.top || bird.y > height - this.bottom){
            if (bird.x > this.x && bird.x < this.x + this.width) {
                return true;
            }
        }
        return false;
    }
}