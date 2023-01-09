'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0EL.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

//Holding current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    score[activeplayer] += currentScore;

    if (activeplayer === 0) {
      score0EL.textContent = score[activeplayer];
      document.getElementById(`current--${activeplayer}`).textContent = 0;
    } else {
      score1El.textContent = score[activeplayer];
      document.getElementById(`current--${activeplayer}`).textContent = 0;
    }

    //2. Check if player's score is >= 100
    if (score[activeplayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', function () {
  score0EL.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  score = [0, 0];
  currentScore = 0;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  activeplayer = 0;
  playing = true;

  document
    .querySelector(`.player--${activeplayer}`)
    .classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;
});
