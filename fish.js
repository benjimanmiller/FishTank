// fish.js

let fishes = [];

function initializeFishes() {
    for (let i = 0; i < 5; i++) {
        const fishWidth = 50;
        const fishHeight = 50;
        fishes.push({
            x: Math.random() * (canvas.width - fishWidth),
            y: Math.random() * (canvas.height - fishHeight),
            width: fishWidth,
            height: fishHeight,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 1 - 0.5,
            life: 100,
            dead: false,
            swayAmplitude: Math.random() * 1 + 0.5,
            swayFrequency: Math.random() * 0.02 + 0.01,
            foodEaten: 0,
            pooped: false
        });
    }
}

function updateFishes() {
    const lifeDecreaseRate = 100 / (30 * 60); // Decrease 100 life units over 600 seconds (10 minutes) at 60 FPS

    fishes = fishes.filter((fish) => {
        if (fish.dead && fish.y + fish.height < 0) {
            // Remove the fish if it has floated off the top of the screen
            return false;
        }
        return true;
    });

    fishes.forEach((fish, i) => {
        if (fish.dead) {
            // Dead fish floats to the top
            fish.y -= 0.7; // Adjust floating speed as needed
            // Add horizontal sway with reduced amplitude for dead fish
            fish.x +=
                Math.sin(fish.y * fish.swayFrequency) * (fish.swayAmplitude * 0.5); // Reduce sway amplitude by half
            return; // Skip further updates for dead fish
        }

        let closestFood = null;
        let closestDistance = Infinity;

        // Find the closest food item within a certain radius
        foods.forEach((food) => {
            const distance = Math.hypot(fish.x - food.x, fish.y - food.y);
            const radius = 400; // Define the detection radius

            if (distance < closestDistance && distance < radius) {
                closestDistance = distance;
                closestFood = food;
            }
        });

        // If there is a closest food within the radius, swim towards it
        if (closestFood) {
            const angle = Math.atan2(closestFood.y - fish.y, closestFood.x - fish.x);
            fish.dx = Math.cos(angle) * 3; // Increase speed
            fish.dy = Math.sin(angle) * 3; // Increase speed
        } else {
            // Gradually change direction for more natural movement if no food is close
            fish.dx += Math.random() * 0.2 - 0.1;
            fish.dy += Math.random() * 0.1 - 0.05; // Smaller changes for vertical movement

            // Limit the maximum speed when not chasing food
            const maxHorizontalSpeed = 2;
            const maxVerticalSpeed = 1; // Slower maximum vertical speed
            fish.dx = Math.max(
                Math.min(fish.dx, maxHorizontalSpeed),
                -maxHorizontalSpeed
            );
            fish.dy = Math.max(
                Math.min(fish.dy, maxVerticalSpeed),
                -maxVerticalSpeed
            );
        }

        // Update fish position
        fish.x += fish.dx;
        fish.y += fish.dy;

        // Bounce the fish off the left and right edges of the canvas
        if (fish.x < 0 || fish.x + fish.width > canvas.width) {
            fish.dx *= -1;
        }

        // Prevent the fish from moving off the top and bottom edges of the canvas
        if (fish.y < 0) {
            fish.y = 0;
            fish.dy = 0;
        }
        if (fish.y + fish.height > canvas.height) {
            fish.y = canvas.height - fish.height;
            fish.dy = 0;
        }

        // Decrease life over time
        fish.life -= lifeDecreaseRate; // Adjust life decrease rate

        // Check for collisions with other fish
        for (let j = i + 1; j < fishes.length; j++) {
            const otherFish = fishes[j];
            if (checkCollision(fish, otherFish)) {
                // Basic collision response: reverse directions
                const tempDx = fish.dx;
                const tempDy = fish.dy;
                fish.dx = otherFish.dx;
                fish.dy = otherFish.dy;
                otherFish.dx = tempDx;
                otherFish.dy = tempDy;

                // Move fish slightly apart to prevent overlapping
                fish.x += fish.dx;
                fish.y += fish.dy;
                otherFish.x += otherFish.dx;
                otherFish.y += otherFish.dy;
            }
        }

        // Check if the fish touches the food
        if (
            closestFood &&
            Math.hypot(fish.x - closestFood.x, fish.y - closestFood.y) <
            fish.width / 2
        ) {
            // Remove the food if touched
            foods = foods.filter((food) => food !== closestFood);

            // If the food is spoiled, turn the fish green and reduce health
            if (closestFood.spoiled) {
                fish.spoiled = true;
                fish.life = Math.max(fish.life / 2, 0); // Reduce life by half
            } else {
                fish.life = Math.min(fish.life + 25, 100); // Refill life, max 100
            }
        }

        // If the fish reaches full health, it is no longer spoiled
        if (fish.life === 100) {
            fish.spoiled = false;
        }

        // Mark the fish as dead if its life reaches 0
        if (fish.life <= 0) {
            fish.dead = true;
        }
    });
}

function drawFishes() {
    fishes.forEach((fish) => {
        context.save(); // Save the current state

        if (fish.dead) {
            // Draw dead fish upside down with darker grey tint
            context.translate(fish.x + fish.width / 2, fish.y + fish.height / 2);
            context.rotate(Math.PI); // Rotate 180 degrees
            offscreenCanvas.width = fish.width;
            offscreenCanvas.height = fish.height;
            offscreenContext.clearRect(0, 0, fish.width, fish.height);
            offscreenContext.drawImage(img, 0, 0, fish.width, fish.height);
            offscreenContext.globalCompositeOperation = "source-atop";
            offscreenContext.fillStyle = "rgba(64, 64, 64, 0.5)"; // Darker grey tint
            offscreenContext.fillRect(0, 0, fish.width, fish.height);
            offscreenContext.globalCompositeOperation = "source-over";
            context.drawImage(
                offscreenCanvas,
                -fish.width / 2,
                -fish.height / 2,
                fish.width,
                fish.height
            );
        } else {
            if (fish.dx > 0) {
                // Flip the fish image horizontally if moving right
                context.translate(fish.x + fish.width, fish.y);
                context.scale(-1, 1);
                context.drawImage(img, 0, 0, fish.width, fish.height);
            } else {
                // Draw normally if moving left
                context.drawImage(img, fish.x, fish.y, fish.width, fish.height);
            }

            if (fish.spoiled) {
                // Tint the fish green if it is spoiled
                offscreenCanvas.width = fish.width;
                offscreenCanvas.height = fish.height;
                offscreenContext.clearRect(0, 0, fish.width, fish.height);
                offscreenContext.drawImage(img, 0, 0, fish.width, fish.height);
                offscreenContext.globalCompositeOperation = "source-atop";
                offscreenContext.fillStyle = "rgba(0, 255, 0, 0.5)";
                offscreenContext.fillRect(0, 0, fish.width, fish.height);
                offscreenContext.globalCompositeOperation = "source-over";
                context.drawImage(
                    offscreenCanvas,
                    fish.x,
                    fish.y,
                    fish.width,
                    fish.height
                );
            }
        }

        context.restore(); // Restore the original state

        if (!fish.dead) {
            // Draw life bar above the fish
            context.fillStyle = "red";
            context.fillRect(fish.x, fish.y - 10, fish.width, 5);
            context.fillStyle = "green";
            context.fillRect(fish.x, fish.y - 10, fish.width * (fish.life / 100), 5);
        }
    });
}

function allFishDead() {
    return fishes.length === 0;
}

function checkCollision(fish1, fish2) {
    const dx = fish1.x - fish2.x;
    const dy = fish1.y - fish2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hitboxReduction = 0.8; // Adjust this value to reduce the hitbox size
    const combinedWidth = (fish1.width + fish2.width) / 2 * hitboxReduction;
    return distance < combinedWidth;
}