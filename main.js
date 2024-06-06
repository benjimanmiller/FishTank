// main.js

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawRestartButton() {
    const buttonWidth = 100; // Adjust size as needed
    const buttonHeight = 100; // Adjust size as needed
    const x = (canvas.width - buttonWidth) / 2;
    const y = (canvas.height - buttonHeight) / 2;
    context.drawImage(restartImg, x, y, buttonWidth, buttonHeight);
}

function restartGame() {
    fishes = [];
    foods = [];
    initializeFishes();
}

function drawBackground() {
    context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (allFishDead()) {
        const buttonWidth = 100; // Adjust size as needed
        const buttonHeight = 100; // Adjust size as needed
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = (canvas.height - buttonHeight) / 2;

        if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
            restartGame();
        }
    } else {
        foods.push({
            x: x,
            y: y,
            width: 20,
            height: 20,
            swayAmplitude: Math.random() * 2 + 1, // Random amplitude between 1 and 3
            swayFrequency: Math.random() * 0.02 + 0.01, // Random frequency between 0.01 and 0.03
            spoilTime: Date.now(), // Time when the food was created
            spoiled: false // Initial state is not spoiled
        });
    }
});

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing

    drawBackground();
    updateFishes();
    updateFood();
    drawFishes();
    drawFood();
    draw_fish_counter();

    if (allFishDead()) {
        drawRestartButton();
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
initializeFishes();