let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let moveDirection = { x: 0, y: 0 };
let food = { x: 2, y: 5 };
let foodEat = new Audio("./assets/music/food_eat.mp3");
let gameOver = new Audio("./assets/music/game_over.mp3");
let scores = 0;
let hiscoreVal = 0;
let newx;
let newy;

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide() {
    for (let i = 1; i < snakeArr.length; i++) {

        //eats own body
        //- moveDirection.x and - moveDirection.y for head collision before body.
        if ((snakeArr[0].x === (snakeArr[i].x - moveDirection.x)) && (snakeArr[0].y === (snakeArr[i].y - moveDirection.y))) {
            return true;
        }
    }


    //bump the head with wall
    if (snakeArr[0].x == 0 || snakeArr[0].x == 18 || snakeArr[0].y == 0 || snakeArr[0].y == 18) {
        return true;
    }
    return false;
}

function randomFoodPlace() {
    let a = 2;
    let b = 16;

    newx = Math.round(a + (b - a) * Math.random());
    newy = Math.round(a + (b - a) * Math.random());

    for (let i = 0; i < snakeArr.length; i++) {
        if (snakeArr[i].x === newx && snakeArr[i].y === newy) {
            debugger;
            newx = Math.round(a + (b - a) * Math.random());
            newy = Math.round(a + (b - a) * Math.random());
            randomFoodPlace();
        }
    }

    return true;
}

function gameEngine() {
    if (isCollide()) {
        gameOver.play();
        moveDirection = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        scores = 0;
        alert("Oops..! Game Over..!");
        return;
    }

    //if eaten food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + moveDirection.x, y: snakeArr[0].y + moveDirection.y })
        foodEat.play();
        scores++;
        // generate food at random position

        // for (let i = 0; i < snakeArr.length; i++) {
        //     if (snakeArr[i].x === newx && snakeArr[i].y === newy) {
        //         newx = Math.round(a + (b - a) * Math.random());
        //         newy = Math.round(a + (b - a) * Math.random());
        //         break;
        //     }
        // }

        if (randomFoodPlace()) {
            food = { x: newx, y: newy }
        }
    }

    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += moveDirection.x;
    snakeArr[0].y += moveDirection.y;

    //generate snake
    board.innerHTML = "";

    //update scores
    score.innerHTML = "Score: " + scores;

    //update hiscore
    hiscoreVal = localStorage.getItem("hiscore");

    if (hiscoreVal === null) {
        hiscoreVal = 0;
        localStorage.setItem("hiscore", hiscoreVal);
    } else {
        if (scores > hiscoreVal) {
            hiscoreVal = scores;
            localStorage.setItem("hiscore", hiscoreVal);
        }
        hiscore.innerHTML = "Hiscore: " + hiscoreVal;
    }

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;

        if (index === 0) snakeElement.classList.add('head');
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    //generate food
    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;

    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    // moveDirection = { x: 0, y: 0 }; 
    //start the game
    switch (e.key) {
        case "ArrowUp":
            if (moveDirection.y != +1) {
                moveDirection.x = 0;
                moveDirection.y = -1;
            }
            break;
        case "ArrowDown":
            if (moveDirection.y != -1) {
                moveDirection.x = 0;
                moveDirection.y = +1;
            }
            break;
        case "ArrowLeft":
            if (moveDirection.x != +1) {
                moveDirection.x = -1;
                moveDirection.y = 0;
            }
            break;
        case "ArrowRight":
            if (moveDirection.x != -1) {
                moveDirection.x = +1;
                moveDirection.y = 0;
            }
            break;
        default:
            break;
    }
});