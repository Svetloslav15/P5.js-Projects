let socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(150);
	socket = io.connect("http://localhost:3000/");
	socket.on("mouse", function(data){
        fill(0);
        noStroke();
        ellipse(data.x, data.y, 50, 50);
	});
}

function draw() {

}

function mouseDragged(){

    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 50, 50);
	let data = {
		x: mouseX,
		y: mouseY
	};

	socket.emit('mouse', data);
}