const readline = require('readline');//extension to read lines
const { stdin, stdout } = process;//standard input and output
let score = 0;//game score
let speed = 5;//game speed
let characterToType = '';//character to type
let gameMode = 'easy'//game mode
let charactersList = gameMode === 'easy' ? 'abcdefghijklmnopqrstuvwxyz' : gameMode === 'medium' ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' : gameMode === 'hard' ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : gameMode === 'expert' ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : 'abcdefghijklmnopqrstuvwxyz';//list of characters to type based on game mode
let time = null;//last time key was pressed
console.log("Type the correct character to score a point");
console.log("Select game mode:");
console.log("1. Easy");
console.log("2. Medium");
console.log("3. Hard");
console.log("4. Expert");
const rl = readline.createInterface({ input: stdin, output: stdout });//create readline interface
rl.on('line', (input) => {
    switch (input) {
        case '1', 'easy':
            gameMode = 'easy';
            charactersList = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case '2', 'medium':
            gameMode = 'medium';
            charactersList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case '3', 'hard':
            gameMode = 'hard';
            charactersList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case '4', 'expert':
            gameMode = 'expert';
            charactersList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}|[]\\:";\'<>?,./';
            break;
    }
    displayCharacter();
    setupInputListener();
});

function getRandomCharacter() {//function to generate random character
    let index = Math.floor(Math.random() * charactersList.length);//random index
    return charactersList[index];//get random character from character set
}

function displayCharacter() {//display character text
    characterToType = getRandomCharacter();//get random character
    console.log("Current character: " + characterToType);
}

function setupInputListener() {
    stdin.setRawMode(true);//use raw mode
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', handleInput);//handle input data
}

function handleInput(key) {//when key is pressed
    if (key === characterToType) {//if key is correct
        score += 1;//increase score
        console.log("Score: " + score);
        speed += 1;//increase speed
        displayCharacter();
    } else {//if key is incorrect
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

