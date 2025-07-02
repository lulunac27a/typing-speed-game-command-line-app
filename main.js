const readline = require('readline');//extension to read lines
const { stdin, stdout } = process;//standard input and output
let score = 0;//score
let speed = 5;//speed
let character = '';//character output
let charactersList = 'abcdefghijklmnopqrstuvwxyz';//list of characters to type
let time = null;//last time key was pressed

console.log("Type the correct character to score a point");

function getRandomCharacter() {//function to generate random character
    let index = Math.floor(Math.random() * charactersList.length);//random index
    return charactersList[index];//get random character from character set
}

function displayCharacter() {//display character text
    character = getRandomCharacter();//get random character
    console.log("Current character: " + character);
}

function setupInputListener() {
    stdin.setRawMode(true);//use raw mode
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', handleInput);//use data
}

function handleInput(key) {//when key is pressed
    if (key === character) {
        score += 1;//increase score
        console.log("Score: " + score);
        speed += 1;//increase speed
        displayCharacter();
    } else {
        endGame();//end the game
    }
    resetTimeout();
}

function resetTimeout() {//reset timeout
    if (time) {
        clearTimeout(time);//clear timeout
    }
    time = setTimeout(endGame, 10000 / speed);//set timeout based on speed
}

function endGame() {//end the game
    stdin.setRawMode(false);
    stdin.pause();
    stdin.removeListener('data', handleInput);
    console.log("Game over");
    console.log("Final score: " + score);
    process.exit();//exit the process
}

displayCharacter();
setupInputListener();

