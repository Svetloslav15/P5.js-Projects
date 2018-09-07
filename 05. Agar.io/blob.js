class Blob {
    constructor(x, y, radius) {
        this.pos = createVector(x, y);
        this.radius = radius;
        this.vel = createVector(0, 0);
    }

    show() {
        if (this.radius >= 64) {
            fill(255);
        }
        else {
            fill(0);
        }
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    update() {
        let newVel = createVector(mouseX - width / 2, mouseY - height / 2);
        newVel.setMag(7);
        this.vel.lerp(newVel, 0.1);
        this.pos.add(this.vel);
    }

    eats(other) {
        let distance = p5.Vector.dist(this.pos, other.pos);
        if (distance < this.radius + other.radius) {
            this.radius++;
            return true;
        }
        return false;
    }

}