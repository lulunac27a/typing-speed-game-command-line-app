const readline = require('readline');
const { stdin, stdout } = process;
let score = 0;
let speed = 5;
let character = '';
let characters = 'abcdefghijklmnopqrstuvwxyz';
let time = null;

console.log("Type the correct character to score a point");

function randomCharacter() {
    let index = Math.floor(Math.random() * characters.length);
    return characters[index];
}

function displayCharacter() {
    character = randomCharacter();
    console.log("Current character: " + character);
}

function setupInputListener() {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', handleInput);
}

function handleInput(key) {
    if (key === character) {
        score += 1;
        console.log("Score: " + score);
        displayCharacter();
    } else {
        endGame();
    }
    speed += 1;
    resetTimeout();
}

function resetTimeout() {
    if (time) {
        clearTimeout(time);
    }
    time = setTimeout(endGame, 10000 / speed);
}

function endGame() {
    stdin.setRawMode(false);
    stdin.pause();
    console.log("Game over");
    console.log("Final score: " + score);
}

displayCharacter();
setupInputListener();

