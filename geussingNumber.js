//Generate a random number between 1 and 500

const submitElm = document.querySelector("#subt");
const userInputElm = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultParas");
const newGameButton = document.querySelector("#newGame");
const lowOrHigh = document.querySelector(".lowOrHigh");
//const btnElm = document.querySelector(".btn");
const p = document.createElement("p");

let randomNumber = parseInt(Math.random() * 100 + 1);
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1!");
  } else if (guess > 100) {
    alert("Please enter a number less than 100!");
  } else {
    // Store record of number of  guesses
    previousGuesses.push(guess);

    //Check if game is over
    if (numGuesses === 6) {
      displayGuesses(guess);
      displayMessage(`Game Over! Number was ${randomNumber}`);
      endGame();
    } else {
      // Show previous guessed numbers
      displayGuesses(guess);

      //Check guess and display if wrong
      checkGuess(guess);
    }
  }
}

function displayGuesses(guess) {
  userInputElm.value = "";
  guessSlot.innerHTML += `${guess}  `;
  numGuesses++;
  remaining.innerHTML = `${6 - numGuesses}  `;
}

if (playGame) {
  submitElm.addEventListener("click", function (evt) {
    evt.preventDefault();
    //Grab guess from user
    const guess = parseInt(userInputElm.value);
    validateGuess(guess);
  });
}

function checkGuess(guess) {
  //Check if guess is correct or too high or too low
  if (guess === randomNumber) {
    displayMessage(`Congratulate! You Got Correct`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number Is low! Try again!`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is High! Try again!`);
  }
}

function displayMessage(message) {
  lowOrHigh.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  //Clear user input
  userInputElm.value = "";
  //Disable user input button
  userInputElm.setAttribute("disabled", "");
  playGame = false;
  newGame();
}

function newGame() {
  newGameButton.addEventListener("click", function () {
    //Input a new random number
    randomNumber = parseInt(Math.random() * 100 + 1);
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.innerHTML = "";
    lowOrHigh.innerHTML = "";
    remaining.innerHTML = `${6 - numGuesses}  `;
    userInputElm.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
