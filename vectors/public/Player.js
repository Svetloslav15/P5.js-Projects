class Player{
    constructor(x, y, radius){
        this.pos = createVector(x, y);
        this.radius = radius;
    }

    show(){
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    constrain(){
        this.pos.x = constrain(this.pos.x, -width * 2, width * 2);
        this.pos.y = constrain(this.pos.y, -height * 2, height * 2);
    }

    update(){
        let mouse = createVector(mouseX - width / 2, mouseY - height / 2);
        mouse.setMag(5);
        this.pos.add(mouse);
        this.show();
    }
}