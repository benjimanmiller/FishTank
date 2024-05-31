// food.js

let foods = [];

function updateFood() {
    const stopHeight = 50; // Adjust this value to set how high above the bottom the food should stop
    const spoilDuration = 60000; // 1 minute in milliseconds

    foods.forEach((food) => {
        if (food.y + food.height < canvas.height - stopHeight) {
            food.y += 2; // Adjust falling speed as needed
            // Add horizontal sway with random amplitude and frequency
            food.x += Math.sin(food.y * food.swayFrequency) * food.swayAmplitude;
        } else {
            food.y = canvas.height - food.height - stopHeight; // Stop at the specified height above the bottom of the canvas

            // Check if the food has been on the bottom for more than 1 minute
            if (!food.spoiled && Date.now() - food.spoilTime > spoilDuration) {
                food.spoiled = true;
            }
        }
    });
}

function drawFood() {
    foods.forEach((food) => {
        context.drawImage(foodImg, food.x, food.y, food.width, food.height);
        if (food.spoiled) {
            // Tint the food green if it is spoiled
            offscreenCanvas.width = food.width;
            offscreenCanvas.height = food.height;
            offscreenContext.clearRect(0, 0, food.width, food.height);
            offscreenContext.drawImage(foodImg, 0, 0, food.width, food.height);
            offscreenContext.globalCompositeOperation = "source-atop";
            offscreenContext.fillStyle = "rgba(0, 255, 0, 0.5)";
            offscreenContext.fillRect(0, 0, food.width, food.height);
            offscreenContext.globalCompositeOperation = "source-over";
            context.drawImage(
                offscreenCanvas,
                food.x,
                food.y,
                food.width,
                food.height
            );
        } else {
            context.drawImage(foodImg, food.x, food.y, food.width, food.height);
        }
    });
}
