let bg;
let player;
let bullets = [];
let opponents = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	bg = loadImage('./sky.png');
	player = new Player(width / 2, height / 2, 64);
}

function draw() {
	background(bg);

    for (let index = 0; index < bullets.length; index++) {
        bullets[index].update();
    }
    translate(width / 2 - player.pos.x, height / 2 - player.pos.y);

    player.update();
    for (let index = 0; index < opponents.length; index++) {
        opponents[index].update();
    }
}

function mousePressed() {
	let vector = createVector(mouseX, mouseY);
	let bullet = new Bullet(width / 2, height / 2, 10, vector);
	bullets.push(bullet);
}