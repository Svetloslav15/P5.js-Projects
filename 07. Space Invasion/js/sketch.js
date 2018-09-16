let player;
let obstacles = [];
let boolean = true;
let score = 0;
let scoreDiv;
var s1;
var s2;
let bg;
let refreshDiv;

function preload() {
    s1 = loadImage('./images/player1.gif');
    s2 = loadImage('./images/alien.gif');
    bg = loadImage('./images/maxresdefault.jpg');
}
function setup() {
	createCanvas(windowWidth / 2 + 100, windowHeight / 2 + 200);
    background(bg);
    player = new Player(width / 2, height - 60);
    for (let i = 0; i < 2; i++) {
        addNewObstacle(boolean);
    }
    scoreDiv = createDiv(score);
    scoreDiv.id("score");
    scoreDiv.position(windowWidth / 2, 30);

    refreshDiv = createDiv('Press ENTER to start the game!');
    refreshDiv.id('refreshDiv');
    refreshDiv.position(windowWidth / 2 - 200, windowHeight / 2 + 300);
}

function draw() {
    if (boolean){
        $('#refreshDiv').hide();
    }
    else{
        $('#refreshDiv').show();
    }
    background(bg);
    player.show();
    if (frameCount % 20 === 0){
        addNewObstacle(boolean);
    }
    for (let index = 0; index < obstacles.length; index++) {
        obstacles[index].update(boolean);
        if (checkHit(obstacles[index])){
            hitAnObstacle();
        }
        if (obstacles[index].y >= height){
            obstacles.splice(index, 1);
            score++;
        }
    }

    if (keyIsDown(LEFT_ARROW) && boolean){
    	player.update('left');
	}
	else if (keyIsDown(RIGHT_ARROW) && boolean){
    	player.update('right');
	}
	$('#score').text(score);
}
function hitAnObstacle() {
    boolean = false;
}
function addNewObstacle(boolean) {
    if (boolean) {
        let x = random(0, width);
        let obstacle = new Obstacle(x, -10);
        obstacles.push(obstacle);
    }
}

function checkHit(obstacle) {
    let playerAPoint = createVector(player.x, player.y);
    let playerBPoint = createVector(player.x + player.width, player.y);
    let playerCPoint = createVector(player.x, player.y + player.height);
    let playerDPoint = createVector(player.x + player.width, player.y + player.height);

    if (playerAPoint.x >= obstacle.x && playerAPoint.x <= obstacle.x + obstacle.width &&
        playerAPoint.y >= obstacle.y && playerAPoint.y <= obstacle.y + obstacle.height){
        return true;
    }
    if (playerBPoint.x >= obstacle.x && playerBPoint.x <= obstacle.x + obstacle.width &&
        playerBPoint.y >= obstacle.y && playerBPoint.y <= obstacle.y + obstacle.height){
    return true;
    }
    if (playerCPoint.x >= obstacle.x && playerCPoint.x <= obstacle.x + obstacle.width &&
        playerCPoint.y >= obstacle.y && playerCPoint.y <= obstacle.y + obstacle.height){
        return true;
    }
    if (playerDPoint.x >= obstacle.x && playerDPoint.x <= obstacle.x + obstacle.width &&
        playerDPoint.y >= obstacle.y && playerDPoint.y <= obstacle.y + obstacle.height){
        return true;
    }
    return false;
}
function keyPressed() {
    if (keyCode === 13){
        boolean = true;
        obstacles.splice(0, obstacles.length);
        score = 0;

    }
}