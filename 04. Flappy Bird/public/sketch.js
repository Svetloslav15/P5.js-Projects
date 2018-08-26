let bird;
let pipes = [];
let score = 0;
var s1;
var bg;
var topPipe;
var bottomPipe;
let scoreDiv;

function preload() {
    s1 = loadImage('../images/bird.gif');
    bg = loadImage('../images/background.png');
    topPipe = loadImage('../images/top.png');
    bottomPipe = loadImage('../images/bottom.png');
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(bg);
	bird = new Bird();
    pipes.push(new Pipe());
    scoreDiv = createDiv(score);
    scoreDiv.id("score");
    scoreDiv.position(width / 2, 30);
}

function draw() {
    background(bg);

    for (let index = 0; index < pipes.length; index++) {
        pipes[index].show();
        pipes[index].update();

        if (pipes[index].hits(bird)){
            score = 0;
        }

        if (pipes[index].x + pipes[index].width === bird.x){
            score++;
        }
        if (pipes[index].offscreen()){
            pipes.splice(index, 1);
        }
    }

    bird.show();
    bird.update();

    if (frameCount % 70 === 0){
        pipes.push(new Pipe());
    }
    $('#score').text(score);
}

function keyPressed() {
     if (keyCode === 32){
        bird.up();
    }
}