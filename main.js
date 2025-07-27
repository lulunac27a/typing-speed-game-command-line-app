const readline = require("readline"); //extension to read line input and output
const { performance } = require("perf_hooks"); //performance time
const { stdin, stdout } = process; //standard input and output
let score = 0; //game score
let difficultyMultiplier = 1; //difficulty multiplier
let lastKeyPressedTime = performance.now(); //last time key was pressed
let keys = 0; //number of keys pressed correctly
let speed = 5; //game speed
let characterToType = ""; //character to type
let gameMode = "easy"; //game mode
let charactersList =
    gameMode === "easy"
        ? "abcdefghijklmnopqrstuvwxyz"
        : gameMode === "medium"
          ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          : gameMode === "hard"
            ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            : gameMode === "expert"
              ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}|[]\\:\";'<>?,./"
              : "abcdefghijklmnopqrstuvwxyz"; //list of characters to type based on game mode
let time = null; //last time key was pressed
console.log("Type the correct character to score a point");
console.log("Select game mode:");
console.log("1. Easy");
console.log("2. Medium");
console.log("3. Hard");
console.log("4. Expert");
const rl = readline.createInterface({ input: stdin, output: stdout }); //create readline interface
rl.on("line", (input) => {
    switch (
        input.toLowerCase() //use lowercase for input
    ) {
        case "1":
        case "easy": //easy game mode
            gameMode = "easy";
            difficultyMultiplier = 1;
            charactersList = "abcdefghijklmnopqrstuvwxyz";
            break;
        case "2":
        case "medium": //medium game mode
            gameMode = "medium";
            difficultyMultiplier = 2;
            charactersList =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case "3":
        case "hard": //hard game mode
            gameMode = "hard";
            difficultyMultiplier = 3;
            charactersList =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
        case "4":
        case "expert": //expert game mode
            gameMode = "expert";
            difficultyMultiplier = 4;
            charactersList =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}|[]\\:\";'<>?,./";
            break;
    }
    displayCharacter(); //display random character
    setupInputListener(); //setup input listener
});

function getRandomCharacter() {
    //function to generate random character
    let index = Math.floor(Math.random() * charactersList.length); //random index
    return charactersList[index]; //get random character from character set
}

function displayCharacter() {
    //display character text
    characterToType = getRandomCharacter(); //get random character
    console.log("Current character: " + characterToType);
}

function setupInputListener() {
    //setup input listener
    stdin.setRawMode(true); //use raw mode
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.on("data", handleInput); //handle input data
}

function handleInput(key) {
    //when key is pressed
    if (key === characterToType) {
        //if key is correct
        score +=
            (speed * difficultyMultiplier) /
                Math.abs(performance.now() - lastKeyPressedTime) +
            1000; //increase score
        lastKeyPressedTime = performance.now(); //update last time key was pressed
        console.log("Score: " + score);
        speed += 1; //increase speed
        keys += 1; //increase keys pressed correctly
        displayCharacter();
    } else {
        //if key is incorrect
        endGame(); //end the game
    }
    resetTimeout();
}

function resetTimeout() {
    //reset timeout
    if (time) {
        clearTimeout(time); //clear timeout
    }
    time = setTimeout(endGame, 10000 / speed); //set timeout based on speed
}

function endGame() {
    //end the game
    stdin.setRawMode(false); //disable raw mode
    stdin.pause();
    stdin.removeListener("data", handleInput);
    console.log("Game over");
    console.log("Final score: " + score);
    console.log("Keys pressed correctly: " + keys);
    process.exit(); //exit the process
}

displayCharacter();
setupInputListener();
