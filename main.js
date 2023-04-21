const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const HEIGHT = canvas.height;
const WIDTH = canvas.width;


let playSpeed = 15;
let winner;
let isGamePaused;


let ball = {
   x : WIDTH / 2,
   y : HEIGHT / 2,
   radius : 10,
   vx :Math.random() < 0.5 ? -5 : 5, // random horizontal velocity
   vy :Math.floor(Math.random() * 10) - 2,
}

const playerLeft = {
    x:10,
    y:160,
    height:80,
    width:10
};

const playerRight = {
    x: WIDTH - 20,
    y: HEIGHT / 2 - 40,
    height: 80,
    width: 10,
};
  
let drawBoard = () => {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,WIDTH,HEIGHT);
}

let drawBall = ()=> {
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

}

let drawPlayer = ()=> {
    ctx.beginPath();
    ctx.rect(playerLeft.x, playerLeft.y, playerLeft.width, playerLeft.height);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(playerRight.x,playerRight.y, playerRight.width, playerRight.height);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}


let initGame = () => {
    drawBoard();
    drawBall();
    drawPlayer();
}

let moveBall = () => {
    ball.x += ball.vx;
    ball.y += ball.vy;
}

let checkCollision = () => {
    // check if the ball hits the floor
    if (ball.y + ball.radius > HEIGHT || ball.y - ball.radius < 0) {
        ball.vy = -ball.vy;
    }
    
    // check if the ball hits the player's paddle
    // when the ball hits the paddle it should increase its speed
    
    if (ball.x - ball.radius < playerLeft.x + playerLeft.width && ball.y > playerLeft.y && ball.y < playerLeft.y + playerLeft.height) {
        ball.vx = -ball.vx;
        ball.vx = ball.vx * 1.2;
        ball.vy = ball.vy * 1.2;
    }


    if (ball.x + ball.radius > playerRight.x && ball.y > playerRight.y && ball.y < playerRight.y + playerRight.height) {
        ball.vx = -ball.vx;
        ball.vx = ball.vx * 1.2;
        ball.vy = ball.vy * 1.2;
    }

    // check if the player's paddle is within the boundaries of the canvas
    if (playerLeft.y < 0) {
        playerLeft.y = 0;
    }

    if (playerLeft.y + playerLeft.height > HEIGHT) {
        playerLeft.y = HEIGHT - playerLeft.height;
    }

    if (playerRight.y < 0) {

        playerRight.y = 0;
    }

    if (playerRight.y + playerRight.height > HEIGHT) {
        playerRight.y = HEIGHT - playerRight.height;
    }

    //  // check if the ball is within the boundaries of the canvas
    //  if (ball.x + ball.radius > WIDTH || ball.x - ball.radius < 0) {
    //     reset();
    // }

    // check if the player missed the ball
    if (ball.x + ball.radius > WIDTH) {
        winner = "Player 1";
        alert("Player 1 wins!");
        reset();
    } else if (ball.x - ball.radius < 0) {
        winner = "Player 2";
        alert("Player 2 wins!");
        reset();
    }

}
            
let pauseGame = () => {
    ball.vx = 0;
    ball.vy = 0;
    isGamePaused = true;
}


let reset = () => {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.vx = Math.random() < 0.5 ? -5 : 5; // random horizontal velocity
    ball.vy = Math.floor(Math.random() * 5) - 2;
    
    playerLeft.x = 10;
    playerLeft.y = 160;
    playerLeft.height = 80;
    playerLeft.width = 10;

    playerRight.x = WIDTH - 20;
    playerRight.y = HEIGHT / 2 - 40;
    playerRight.height = 80;
    playerRight.width = 10;

    isGamePaused = !isGamePaused;
}


let update = () => {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    checkCollision();
    moveBall();
    // --- 
    drawBoard();
    drawBall();
    drawPlayer();
}


document.addEventListener("keydown", (event) => {
    if(event.key === "w") {
        playerLeft.y -= playSpeed;
    } else if (event.key === "s") {
        playerLeft.y += playSpeed;
    } else if (event.key === "ArrowUp") {
        playerRight.y -= playSpeed;
    } else if (event.key === "ArrowDown") {
        playerRight.y += playSpeed;
    } else if(event.key === " ") {
        if(!isGamePaused) pauseGame();
        else reset();
    }
})

let gameLoop = ()  => {
    update();
    requestAnimationFrame(gameLoop);
}



let play = () => {
    gameLoop();
}

initGame();
