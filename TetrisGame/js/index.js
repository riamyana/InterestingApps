let e = { x: 5, y: 1 };
let e2 = { x: 5, y: 2 };
let e3 = { x: 6, y: 2 };
let speed = 7;
let lastPaintTime = 0;
let start = 0;
let moveDirection = { x: 0, y: 0 };
let randomShapeIndex = 0;

let shapesArray = [
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }],
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }, { x: 10, y: 1 }],
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }],
    [{ x: 9, y: 1 }, { x: 10, y: 1 }, { x: 9, y: 2 }, { x: 8, y: 2 }],
    [{ x: 9, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }],
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }]
];

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

    lastPaintTime = ctime;
    gameEngine();
    console.log("hello");
}

function isBorder(side, currentShapeIndex) {

    if (side == "left") {
        for (let i = 0; i < shapesArray[currentShapeIndex].length; i++) {
            if (shapesArray[currentShapeIndex][i].x === 1) return true;
        }
    } else if (side == "bottom") {
        for (let i = 0; i < shapesArray[currentShapeIndex].length; i++) {
            if (shapesArray[currentShapeIndex][i].y === 19) {
                return true;
            }
        }
    } else if (side == "right") {
        for (let i = 0; i < shapesArray[currentShapeIndex].length; i++) {
            if (shapesArray[currentShapeIndex][i].x === 18) return true;
        }
    }
    return false;
}

function generateRandomShape() {
    let a = 0;
    let b = 5;

    randomShapeIndex = Math.round(a + (b - a) * Math.random());
}

function gameEngine() {

    if (isBorder("bottom", randomShapeIndex)) {
        //Generate random Shapes
        generateRandomShape();
        console.log(randomShapeIndex);
    }

    board.innerHTML = "";

    for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
        elem = document.createElement('div');
        elem.style.gridColumnStart = shapesArray[randomShapeIndex][i].x;
        elem.style.gridRowStart = shapesArray[randomShapeIndex][i].y;

        elem.classList.add('element');
        board.appendChild(elem);
    }

    //move the shape down
    for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
        shapesArray[randomShapeIndex][i].y += start;
    }
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    moveDirection = { x: 0, y: 0 };
    //start the game
    start = 1;
    switch (e.key) {
        case "ArrowDown":
            // if (!isBorder("bottom")) {
            //     for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
            //         shapesArray[randomShapeIndex][i].y += 1;
            //     }
            // }
            break;
        case "ArrowLeft":
            if (!isBorder("left", randomShapeIndex)) {
                for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
                    shapesArray[randomShapeIndex][i].x -= 1;
                }
            }
            break;
        case "ArrowRight":
            if (!isBorder("right", randomShapeIndex)) {
                for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
                    shapesArray[randomShapeIndex][i].x += 1;
                }
            }
            break;
        default:
            break;
    }
});