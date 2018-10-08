let bg;
let player;
let bullets = [];
let opponents = [];
let socket = io.connect("http://localhost:8000");
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
    fill(255);
    line(width, height * 2, width * 2, height * 2);
    line(width, height * 2, width, -height * 2);
    line(width * 2, height * 2, -width * 2, height);
    line(width,  -height * 2, -width * 2, -height * 2);

    player.update();
    let data = {
        x: player.pos.x,
        y: player.pos.y,
    };
    socket.emit("playerMove", data);
    for (let index = 0; index < opponents.length; index++) {
        opponents[index].update();
    }
    socket.on("playerMove", function (data) {
        console.log(data);
        let opponent = new Player(data.x, data.y, 64);
        opponents.push(opponent);
    });
}

function mousePressed() {
	let vector = createVector(mouseX, mouseY);
	let bullet = new Bullet(width / 2, height / 2, 10, vector);
	bullets.push(bullet);
	socket.emit("playerFire", 5);
}


socket.on("playerFire", function (bullet) {
    // bullet.update();
    console.log(55);
});