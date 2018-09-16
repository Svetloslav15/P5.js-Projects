class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    show(){
        fill(255);
        noStroke();
        image(s1, this.x, this.y, this.width, this.height);
    }

    update(direction){
        if (direction === "right"){
            this.x += 6;
        }
        else if (direction === "left"){
            this.x -= 6;
        }
        if (this.x >= width - 10){
            this.x = width - 10;
        }
        if (this.x <= 10){
            this.x = 10;
        }
        this.show();
    }
}