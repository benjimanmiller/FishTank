// poop.js

let poops = [];

function createPoop(x, y, creatorId) {
    poops.push({
        x: x,
        y: y,
        width: 20,
        height: 20,
        swayAmplitude: Math.random() * 2 + 1,
        swayFrequency: Math.random() * 0.02 + 0.01,
        type: 'poop',
        creatorId: creatorId // Add the ID of the fish that created the poop
    });
}

function updatePoop() {
    const stopHeight = 50;

    poops.forEach(poop => {
        if (poop.y + poop.height < canvas.height - stopHeight) {
            poop.y += 2;
            poop.x += Math.sin(poop.y * poop.swayFrequency) * poop.swayAmplitude;
        } else {
            poop.y = canvas.height - poop.height - stopHeight;
        }
    });
}

function drawPoop() {
    poops.forEach(poop => {
        context.drawImage(poopImg, poop.x, poop.y, poop.width, poop.height);
    });
}