class Bird{
    constructor(){
        this.x = 50;
        this.y = height / 2;
        this.gravity = 0.6;
        this.velocity = 0;
    }

    show(){
        image(s1, this.x, this.y, 60, 60);
    }

    update(){
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y >= height){
            this.y = height + 10;
            this.velocity = 0;
        }
    }

    up(){
      this.velocity -= 13;
    }

}