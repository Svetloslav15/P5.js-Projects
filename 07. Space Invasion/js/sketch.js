let player;
let obstacles = [];
let boolean = true;
let score = 0;
let scoreDiv;
var s1;
var s2;
let bg;
let refreshDiv;
let pellets = [];

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
    if (boolean) {
        $('#refreshDiv').hide();
    }
    else {
        $('#refreshDiv').show();
    }
    background(bg);
    player.show();
    if (frameCount % 20 === 0) {
        addNewObstacle(boolean);
    }
    if (frameCount % 15 === 0) {
        addNewPellet(boolean);
    }
    for (let index = 0; index < obstacles.length; index++) {
        let currentObstacle = obstacles[index];

        for (let i = 0; i < pellets.length; i++) {
            let currentPellet = pellets[i];
            console.log(currentPellet + "<->" + currentObstacle + "index:" + index + " i: " + i);
            if (currentObstacle.x <= currentPellet.x &&
                currentObstacle.x + currentObstacle.width >= currentPellet.x &&
                currentObstacle.y <= currentPellet.y &&
                currentObstacle.y + currentObstacle.height >= currentPellet.y) {
                obstacles.splice(index, 1);
                pellets.splice(i, 1);
                score++;
            }
        }
        currentObstacle.update(boolean);

        if (checkHit(currentObstacle)) {
            hitAnObstacle();
        }
        if (currentObstacle.y >= height) {
            obstacles.splice(index, 1);
            index--;
        }
    }
    for (let index = 0; index < pellets.length; index++) {
        let currentPellet = pellets[index];
        currentPellet.update();
        if (currentPellet.y <= 0) {
            pellets.splice(index, 1);
            index--;
            currentPellet = pellets[index];
        }
    }
    if (keyIsDown(LEFT_ARROW) && boolean) {
        player.update('left');
    }
    else if (keyIsDown(RIGHT_ARROW) && boolean) {
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

    if (playerAPoint.x + 10 >= obstacle.x && playerAPoint.x - 10 <= obstacle.x + obstacle.width &&
        playerAPoint.y - 10 >= obstacle.y && playerAPoint.y + 10 <= obstacle.y + obstacle.height) {
        return true;
    }
    if (playerBPoint.x + 10 >= obstacle.x && playerBPoint.x - 10 <= obstacle.x + obstacle.width &&
        playerBPoint.y - 10 >= obstacle.y && playerBPoint.y + 10 <= obstacle.y + obstacle.height) {
        return true;
    }
    if (playerCPoint.x + 10 >= obstacle.x && playerCPoint.x - 10 <= obstacle.x + obstacle.width &&
        playerCPoint.y - 10 >= obstacle.y && playerCPoint.y + 10 <= obstacle.y + obstacle.height) {
        return true;
    }
    if (playerDPoint.x + 10 >= obstacle.x && playerDPoint.x - 10 <= obstacle.x + obstacle.width &&
        playerDPoint.y - 10 >= obstacle.y && playerDPoint.y + 10 <= obstacle.y + obstacle.height) {
        return true;
    }
    return false;
}

function keyPressed() {
    if (keyCode === 13) {
        boolean = true;
        obstacles.splice(0, obstacles.length);
        score = 0;

    }
}

function addNewPellet(boolean) {
    if (boolean) {
        let pellet = new Pellet(player.x + player.width / 2, player.y);
        pellets.push(pellet);
    }
}