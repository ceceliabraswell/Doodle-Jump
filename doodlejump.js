// board
let board;
let boardWidth = 360;   //  dimensions of background image
let boardHeight = 576;  //  dimensions of background image
let context; 

// variables for Doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;  // 180 - 23= 157
let doodlerY = boardHeight*7/8 - doodlerHeight; // 40.25 - 46= -5.75 
let doodlerRightImg;
let doodlerLeftImg;

// game physics
let velocityX = 0;

// specs for drawing doodler on canvas
let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodlerHeight
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");   // used for drawing on the board

    // load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "./images/doodler-right.png";
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function() {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./images/doodler-left.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // draw doodler over and over again
    doodler.x += velocityX;

    if (doodler.x > boardWidth) {
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width < 0) {
        doodler.x = boardWidth;
    }

    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
}

function moveDoodler(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {   // move right
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {   // move left
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
}