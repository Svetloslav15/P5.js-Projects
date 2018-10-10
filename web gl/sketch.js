let angle = 0;
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(175);

	fill(255, 0, 150);
	rotateX(angle);
	rotateY(-angle);
	torus(150, 20);
	angle += 0.02;
}