let e = { x: 5, y: 1 };
let e2 = { x: 5, y: 2 };
let e3 = { x: 6, y: 2 };
let speed = 7;
let lastPaintTime = 0;
let start = 0;
let moveDirection = { x: 0, y: 0 };
let randomShapeIndex = 0;
let currentShape = [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }];
let filledShapes = [];

let shapesArray = [
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }], // |_
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 10, y: 2 }, { x: 10, y: 1 }], // box
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }], // line
    [{ x: 8, y: 2 }, { x: 9, y: 2 }, { x: 9, y: 1 }, { x: 10, y: 1 }], //_|-
    [{ x: 9, y: 1 }, { x: 10, y: 2 }, { x: 10, y: 1 }, { x: 11, y: 2 }], //-|_
    [{ x: 9, y: 2 }, { x: 10, y: 2 }, { x: 11, y: 2 }, { x: 10, y: 1}] // baki _|_
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
        for (let i = 0; i < currentShape.length; i++) {
            if (currentShape[i].x === 1) return true;
        }
    } else if (side == "bottom") {
        for (let i = 0; i < currentShape.length; i++) {
            if (currentShape[i].y === 18) {
                return true;
            }
        }
    } else if (side == "right") {
        for (let i = 0; i < currentShape.length; i++) {
            if (currentShape[i].x === 18) return true;
        }
    }
    return false;
}

function rotate() {
    let center = currentShape[1];
    let difference = { x: 0, y: 0 };

    for (let i = 0; i < currentShape.length; i++) {
        if (i == 1) continue;

        difference.x = center.x - currentShape[i].x;
        difference.y = center.y - currentShape[i].y;

        if (difference.x < 0 && difference.y === 0) {
            // right
            currentShape[i].x += difference.x;
            currentShape[i].y -= difference.x;
        } else if (difference.x === 0 && difference.y > 0) {
            // top
            currentShape[i].x += difference.y;
            currentShape[i].y += difference.y;
        } else if (difference.x > 0 && difference.y === 0) {
            // left
            currentShape[i].x += difference.x;
            currentShape[i].y -= difference.x;
        } else if (difference.x === 0 && difference.y < 0) {
            // bottom
            currentShape[i].x += difference.y;
            currentShape[i].y += difference.y;
        } else if (difference.x > 0 && difference.y > 0) {
            // top-left
            currentShape[i].x += Math.pow(difference.x, 2) + Math.pow(difference.y, 2);
        } else if (difference.x < 0 && difference.y > 0) {
            // top-right
            currentShape[i].y += Math.pow(difference.x, 2) + Math.pow(difference.y, 2);
        } else if (difference.x < 0 && difference.y < 0) {
            // bottom-right
            currentShape[i].x -= Math.pow(difference.x, 2) + Math.pow(difference.y, 2);
        } else if (difference.x > 0 && difference.y < 0) {
            // bottom-left
            currentShape[i].y -= Math.pow(difference.x, 2) + Math.pow(difference.y, 2);
        } 
    }
}

function generateRandomShape() {
    let a = 0;
    let b = 5;

    randomShapeIndex = Math.round(a + (b - a) * Math.random());
}

function gameEngine() {
    if (isBorder("bottom", randomShapeIndex)) {
        //Generate random Shapes
        filledShapes.push(currentShape);
        console.log("filled");
        console.log(filledShapes);
        generateRandomShape();
        console.log(randomShapeIndex);

        //To avoid reference problem
        currentShape = new Array();
        currentShape = JSON.parse(JSON.stringify(shapesArray[randomShapeIndex]));
        console.log("currentShape");
        console.log(currentShape);

        console.log("shape");
        console.log(shapesArray[randomShapeIndex]);
        // return;
    }

    //add shape to board
    board.innerHTML = "";

    for (let i = 0; i < currentShape.length; i++) {
        elem = document.createElement('div');
        elem.style.gridColumnStart = currentShape[i].x;
        elem.style.gridRowStart = currentShape[i].y;

        elem.classList.add('element');
        board.appendChild(elem);
    }


    //add filled shapes to board
    for (let i = 0; i < filledShapes.length; i++) {
        for (let j = 0; j < filledShapes[i].length; j++) {
            elem = document.createElement('div');
            elem.style.gridColumnStart = filledShapes[i][j].x;
            elem.style.gridRowStart = filledShapes[i][j].y;

            elem.classList.add('element');
            board.appendChild(elem);
        }
    }

    //move the shape down
    for (let i = 0; i < currentShape.length; i++) {
        currentShape[i].y += start;
    }
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    moveDirection = { x: 0, y: 0 };
    //start the game
    start = 1;
    switch (e.key) {
        case "ArrowUp":
            debugger;
            rotate();
            gameEngine();
            break;
        case "ArrowDown":
            // if (!isBorder("bottom")) {
            //     for (let i = 0; i < shapesArray[randomShapeIndex].length; i++) {
            //         shapesArray[randomShapeIndex][i].y += 1;
            //     }
            // }
            break;
        case "ArrowLeft":
            if (!isBorder("left", randomShapeIndex)) {
                for (let i = 0; i < currentShape.length; i++) {
                    currentShape[i].x -= 1;
                }
            }
            break;
        case "ArrowRight":
            if (!isBorder("right", randomShapeIndex)) {
                for (let i = 0; i < currentShape.length; i++) {
                    currentShape[i].x += 1;
                }
            }
            break;
        default:
            break;
    }
});