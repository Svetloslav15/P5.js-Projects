var me;
var opponent;
let opponentY;
let ball;
let myScore = 0;
let opponentScore = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    me = new Player(10, mouseY);
    opponent = new Player(width - 40, 100);
    opponentY = 100;
    ball = new Ball(width / 2, height / 2);
    ball.show();
    me.show();
    opponent.show();
}

function draw() {
    noStroke();
    background(150);
    textSize(32);
    text(`${myScore} - ${opponentScore}`, width / 2, 100);

    if (keyIsDown(UP_ARROW)){
        opponentY -= 10;
    }
    else if (keyIsDown(DOWN_ARROW)){
        opponentY += 10;
    }
    opponent.update(width - 40, opponentY);
    me.update(10, mouseY);
    ball.update();

}