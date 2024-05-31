// preload.js

const canvas = document.getElementById('fish-tank');
const context = canvas.getContext('2d');

const offscreenCanvas = document.createElement('canvas');
const offscreenContext = offscreenCanvas.getContext('2d');

const img = new Image();
img.src = 'fish.png';
const foodImg = new Image();
foodImg.src = 'food.png';
const restartImg = new Image();
restartImg.src = 'restart.png';
const backgroundImg = new Image();
backgroundImg.src = 'background.png';
const poopImg = new Image();
poopImg.src = 'poop.png';

// Ensure all images are loaded before starting the game loop
let imagesLoaded = 0;
const totalImages = 4;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameLoop();
    }
}

img.onload = imageLoaded;
foodImg.onload = imageLoaded;
restartImg.onload = imageLoaded;
backgroundImg.onload = imageLoaded;