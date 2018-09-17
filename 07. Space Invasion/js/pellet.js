class Pellet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 10;
    }

    show(){
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    update(){
        this.y -= 5;
        this.show();
    }
}