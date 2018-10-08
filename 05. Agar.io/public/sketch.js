let blob;
let zoom = 1;
let blobs = [];
let socket;
let opponents = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect("http://localhost:3000");

    blob = new Blob(random(width), random(height), 64);
    for (let i = 0; i < 500; i++) {
        let x = random(-width * 2, width * 2);
        let y = random(-height * 2, height * 2);
        let currBlob = new Blob(x, y, 20);
        blobs.push(currBlob);
    }
    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        radius: blob.radius
    };
    socket.emit("start", data);
}

function draw() {
    background(150);

    translate(width / 2, height / 2);
    let newScale = 64 / blob.radius;
    zoom = lerp(zoom, newScale, 0.01);
    scale(zoom);
    translate(- blob.pos.x, -blob.pos.y);
    blob.update();
    blob.constrain();
    blob.show();
    for (let i = 0; i < blobs.length; i++) {
        if (blob.eats(blobs[i])){
            blobs.splice(i, 1);
            let x = random(-width, width);
            let y = random(-height, height);
            let currBlob = new Blob(x, y, 20);
            blobs.push(currBlob);
        }
        else{
            blobs[i].show();
        }
    }

    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        radius: blob.radius
    };
    socket.emit("update", data);
    for (let index = 0; index < opponents.length; index++) {
        fill(0);
        text(opponents[index].x, opponents[index].y, opponents.id);
        ellipse(opponents[index].x, opponents[index].y, opponents[index].r);
    }
    socket.on('heartbeat', function(data) {
            opponents = data;
        }
    );
}
