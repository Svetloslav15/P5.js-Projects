class Bullet{
    constructor(x, y, radius, vector){
        this.pos = createVector(x, y);
        this.radius = radius;
        this.vector = vector;
    }

    show(){
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    update(){
        let newVector = createVector(this.vector.x - width / 2, this.vector.y - height / 2);
        newVector.setMag(5);
        this.pos.add(newVector);
        this.show();
    }
}