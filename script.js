'use strict';

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const displayName0 = document.getElementById('displayName--0');
const displayName1 = document.getElementById('displayName--1');
const inputName0 = document.getElementById('input--0');
const inputName1 = document.getElementById('input--1');

// Game state variables
let scores, currentScore, activePlayer, playing;

// Initialize the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // Pause play until user clicks Start
  playing = false;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  // Show rules modal and backdrop on init/new game
  const rulesInit = document.getElementById('rules');
  const backdropInit = document.getElementById('backdrop');
  if (rulesInit) rulesInit.classList.remove('hidden');
  if (backdropInit) backdropInit.classList.remove('hidden');
  // reset name inputs to empty so user can enter new names on New Game
  if (inputName0) inputName0.value = '';
  if (inputName1) inputName1.value = '';
  // reset displayed names to defaults
  const nameEl0 = document.getElementById('name--0');
  const nameEl1 = document.getElementById('name--1');
  if (nameEl0) nameEl0.textContent = 'Player 1';
  if (nameEl1) nameEl1.textContent = 'Player 2';
  if (displayName0) displayName0.textContent = 'Player 1';
  if (displayName1) displayName1.textContent = 'Player 2';
  // Disable roll/hold until Start pressed
  btnRoll.disabled = true;
  btnHold.disabled = true;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener("click", init);

// Modal behavior
const rulesEl = document.getElementById('rules');
const btnStart = document.getElementById('btn--start');
const backdropEl = document.getElementById('backdrop');

const startGame = function () {
  playing = true;
  btnRoll.disabled = false;
  btnHold.disabled = false;
  if (rulesEl) rulesEl.classList.add('hidden');
  if (backdropEl) backdropEl.classList.add('hidden');
  if (backdropEl) backdropEl.style.display = 'none';
};

if (btnStart) {
  btnStart.addEventListener('click', function (e) {
    e.stopPropagation();
    // Read names from inputs and update displays
    const name0 = inputName0 && inputName0.value.trim() ? inputName0.value.trim() : 'Player 1';
    const name1 = inputName1 && inputName1.value.trim() ? inputName1.value.trim() : 'Player 2';
    const nameEl0 = document.getElementById('name--0');
    const nameEl1 = document.getElementById('name--1');
    if (nameEl0) nameEl0.textContent = name0;
    if (nameEl1) nameEl1.textContent = name1;
    if (displayName0) displayName0.textContent = name0;
    if (displayName1) displayName1.textContent = name1;
    startGame();
  });
}
