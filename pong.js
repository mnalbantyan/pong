// Select the canvas element
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Create the paddles
const paddleWidth = 10;
const paddleHeight = 100;
const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "WHITE",
    dy: 5
};
const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "WHITE",
    dy: 5
};

// Create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: "WHITE"
};

// Draw the paddles
function drawPaddle(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Draw the ball
function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Draw the net
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        context.fillStyle = "WHITE";
        context.fillRect(canvas.width / 2 - 1, i, 2, 10);
    }
}

// Draw everything
function draw() {
    // Clear the canvas
    context.fillStyle = "BLACK";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the net
    drawNet();

    // Draw the paddles
    drawPaddle(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawPaddle(player2.x, player2.y, player2.width, player2.height, player2.color);

    // Draw the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

// Update the game objects
function update() {
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) {
        ball.dx *= -1;
    } else if (ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height) {
        ball.dx *= -1;
    }

    // Reset ball if it goes out of bounds
    if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
        resetBall();
    }

    // Move paddles
    if (upPressed && player1.y > 0) {
        player1.y -= player1.dy;
    } else if (downPressed && player1.y + player1.height < canvas.height) {
        player1.y += player1.dy;
    }

    if (wPressed && player2.y > 0) {
        player2.y -= player2.dy;
    } else if (sPressed && player2.y + player2.height < canvas.height) {
        player2.y += player2.dy;
    }
}

// Reset the ball to the center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Control paddles
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
    if (event.key === "w") wPressed = true;
    if (event.key === "s") sPressed = true;
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
    if (event.key === "w") wPressed = false;
    if (event.key === "s") sPressed = false;
});

// The game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
