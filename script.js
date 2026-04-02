'use strictt';

const { act } = require("react");

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); //same work as getElementById but more general and can be used for any selector
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const score = [0, 0];
let currentScore = 0;
let activePlayer = 0; //0 for player 1 and 1 for player 2

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`; //changing the image of the dice according to the number rolled
  if (dice !== 1) { 
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore; //changing the current score of the active player
  } else {
    //Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0; //changing the current score of the active player
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //switching the active player
    player0El.classList.toggle("player--active"); //toggling the active class to change the background color of the active player
    player1El.classList.toggle("player--active");
  } 
});

btnHold.addEventListener("click", function () {
  //1. Add current score to active player's score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]; //changing the total score of the active player
  //2. Check if player's score is >= 100

  //Finish the game

  // Switch to the next player