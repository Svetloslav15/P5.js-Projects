let backgroundColor;
let select;
let slider;
var penSize;
let valueFill = 255;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(150);
    select = createSelect();
    select.id("background-color");
    select.position(10, 10);
    select.option("gray");
    select.option("white");
    select.option("black");
    select.option("red");
    select.option("yellow");
    select.option("green");
    select.option("purple");
    select.option("orange");
    select.changed(changeBackground);

    slider = createSlider(0, 255, 100);
    slider.position(10, 30);
    slider.style('width', '100px');
}

function mouseDragged() {
	// changeBackground();
	calculatePenSize();
    fill(valueFill);
    noStroke();
	ellipse(mouseX, mouseY, penSize, penSize);
}
function doubleClicked() {
	if (valueFill === 0){
		valueFill = 255;
	}
	else {
		valueFill = 0;
	}
	changeBackground();
}

function changeBackground() {
    let value = $('#background-color').val();
    if (value === "white"){
    	background(255);
	}
	else if (value === "black"){
    	background(0);
	}
    else if (value === "gray"){
        background(150);
    }
    else if (value === "red"){
        background(248, 34, 27);
    }
    else if (value === "yellow"){
        background(248, 242, 52);
    }
    else if (value === "green"){
        background(112, 190, 71);
    }
    else if (value === "purple"){
        background(178, 0, 246);
    }
    else if (value === "orange"){
        background(249, 126, 9);
    }
}

function calculatePenSize() {
	let value = slider.value();
	penSize = value * 0.8;
}