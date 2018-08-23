let s;
const scl = 20;

let food;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();

    let speechRec = new p5.SpeechRec('en-US', gotSpeech);
    speechRec.start(true, true);

    function gotSpeech() {
        console.log(speechRec.resultString);
        let direct = speechRec.resultString.split(' ');
        for (let direction of direct) {
            if (direction === "up") {
                s.dir(0, -1);
            }
            else if (direction === "down") {
                s.dir(0, 1);
            }
            else if (direction === "right") {
                s.dir(1, 0);
            }
            else if (direction === "left") {
                s.dir(-1, 0);
            }
            else if (direction === "start"){
                s.x = 0;
                s.y = 0;
            }
        }
    }
}

function pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function mousePressed() {
    s.total++;
}

function draw() {
    background(51);

    if (s.eat(food)) {
        pickLocation();
    }
    s.death();
    s.update();
    s.show();


    fill(255, 0, 100);
    ellipse(food.x, food.y, scl, scl);
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}