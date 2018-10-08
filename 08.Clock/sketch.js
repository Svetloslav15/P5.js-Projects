function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
	let hr = hour();
	let mn = minute();
	let sec = second();

	strokeWeight(8);
    stroke(255, 100, 150);
    noFill();
	let end = map(sec, 0, 59, 0, 360);
	arc(0, 0, 300, 300, 0, end);
    console.log(end);
    stroke(232, 241, 97);
    let endMin = map(mn, 0, 59, 0, 360);
    arc(0, 0, 280, 280, 0, endMin);

    stroke(109, 137, 119);
    let endHours = map(hr % 12, 0, 12, -90, 270);
    arc(0, 0, 260, 260, 0, endHours);
}