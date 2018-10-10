let grid = [];
let score = 0;
let gameOver = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    grid = blankGrid();
    addNewNumber();
}

function draw() {
    background(175);
    let widthRect = 100;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let el = grid[i][j];
            if (el != 0){
                fill(colorsSizes[el].color);
            }
            else {
                fill(255);
            }
            strokeWeight(2);
            rect(i * widthRect + width / 2 - 200, j * widthRect + height / 2 - 200, widthRect, widthRect);
            let value = grid[i][j];
            if (value !== 0) {
                textAlign(CENTER, CENTER);
                textSize(40);
                fill(0);
                text(value, i * widthRect + width / 2 - 155, j * widthRect + height / 2 - 150);
            }
        }
    }
    if (isGameOver()) {
        gameOver = true;
        score = "Press ENTER to play again!";
    }
    fill(255);
    text(score, width / 2, 50);
}

function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function compare(a, b) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (a[row][col] != b[row][col]) {
                return true;
            }
        }
    }
    return false;
}

function keyPressed() {
    let flipped = false;
    let rotated = false;
    if (!gameOver) {
        if (keyCode == UP_ARROW) {
            grid = flip(grid);
            flipped = true;
        }
        else if (keyCode == LEFT_ARROW) {
            grid = rotateGrid(grid);
            grid = flip(grid);
            rotated = true;
            flipped = true;
        }
        else if (keyCode == RIGHT_ARROW) {
            grid = rotateGrid(grid);
            rotated = true;
        }
        if (keyCode == UP_ARROW || keyCode == DOWN_ARROW ||
            keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
            let past = copyGrid(grid);
            for (let i = 0; i < 4; i++) {
                grid[i] = operate(grid[i]);
            }
            let changed = compare(past, grid);
            if (flipped) {
                flip(grid);
            }

            if (rotated) {
                grid = rotateGrid(grid);
            }
            if (changed) {
                addNewNumber();
            }
        }
    }
    if (keyCode == 13){
        score = 0;
        grid = blankGrid();
        gameOver = false;
        addNewNumber();
        addNewNumber();
    }
}

function flip(grid) {
    for (let row = 0; row < 4; row++) {
        grid[row] = grid[row].reverse();
    }
    return grid;
}

function copyGrid(grid) {
    let extra = blankGrid();
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            extra[row][col] = grid[row][col];
        }
    }
    return extra;
}

function operate(row) {
    row = slideRow(row);
    row = combineRow(row);
    row = slideRow(row);
    return row;
};

function addNewNumber() {
    let options = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] == 0) {
                options.push({
                    row: row,
                    col: col
                });
            }
        }
    }
    if (options.length > 0) {
        let spot = random(options);
        let value = random(1);
        grid[spot.row][spot.col] = (value > 0.5 ? 2 : 4);
    }

}

function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
            if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function slideRow(row) {
    let arr = row.filter(x => x);
    let missingCount = 4 - arr.length;
    let zeros = Array(missingCount).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combineRow(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            row[i - 1] = 0;
            score += a + b;
        }
    }
    return row;
}

function rotateGrid(grid) {
    let newGrid = blankGrid();
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            newGrid[row][col] = grid[col][row];
        }
    }
    return newGrid;
}
let colorsSizes = {
    2: {
        color: "#33B14A"
    },
    4: {
        color: "#0DA65D"
    },
    8: {
        color: "#1AB4A1"
    },
    16: {
        color: "#2494C1"
    },
    32: {
        color: "#397DDC"
    },
    64: {
        color: "#424FEE"
    },
    128: {
        color: "#4600FD"
    },
    256: {
        color: "#7B00DB"
    },
    512: {
        color: "#AC04CD"
    },
    1024: {
        color: "#DB26BE"
    },
    2048: {
        color: "#F9102E"
    },
    4096: {
        color: "#F0DB0C"
    },
    8182: {
        color: "#DA5D08"
    },
};