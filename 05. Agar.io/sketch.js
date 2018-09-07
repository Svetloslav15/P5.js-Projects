let blob;
let blobs = [];
let zoom = 1;
let socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://localhost:8000');

    blob = new Blob(0, 0, 64);

    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.radius
    };

    socket.emit("start", data);

    for (let index = 0; index <= 600; index++) {
        let x = random(-(10 * width), width * 10);
        let y = random(-(10 * height), height * 10);
        blobs[index] = new Blob(x, y, 16);
    }
}

function draw() {
    background(150);

    translate(width / 2, height / 2);
    let newzoom = 64 / blob.radius;
    zoom = lerp(zoom, newzoom, 0.01);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    blob.show();
    blob.update();
    for (let index = blobs.length - 1; index >= 0; index--) {
        blobs[index].show();
        if (blob.eats(blobs[index])) {
            blobs.splice(index, 1);
            let x = random(-(3 * width), width * 2);
            let y = random(-(3 * height), height * 2);
            blobs.push(new Blob(x, y, 16));
        }
    }
}