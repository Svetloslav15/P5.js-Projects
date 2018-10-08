class Blob {
    constructor(x, y, radius) {
        this.pos = createVector(x, y);
        this.radius = radius;
        this.vel = createVector(0, 0);
    }

    show(){
        if (this.radius < 64){
            fill(0);
        }
        else{
            fill(255);
        }
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    update(){
        let mouse = createVector(mouseX - width / 2, mouseY - height / 2);
        mouse.setMag(5);
        this.vel.lerp(mouse, 0.1);
        this.pos.add(this.vel);
    }

    constrain(){
        blob.pos.x = constrain(blob.pos.x, -2 * width, 2 * width);
        blob.pos.y = constrain(blob.pos.y, -2 * height, 2 * height);
    }

    eats(blob){
        let distance = p5.Vector.dist(this.pos, blob.pos);
        if (distance <= this.radius + blob.radius){
            this.radius += 0.3;
            return true;
        }
        return false;
    }
}