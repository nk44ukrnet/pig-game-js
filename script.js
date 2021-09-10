"use strict";

const restart = document.querySelector('.restart'),
    dice = document.querySelector('.dice'),
    currentScore = document.querySelectorAll('.current-score'),
    staticScore = document.querySelectorAll('.static-score'),
    roll = document.querySelector('.roll'),
    hold = document.querySelector('.hold'),
    winner = document.querySelector('.winner'),
    player = document.querySelectorAll('.player');

const gameOverTrashHold = 100;

let currentStaticScore = [0, 0];
let dynamicScore = 0;
let acTivePlayer = 0,
    isGameOver = false,
    diceValue;

function init() {
    currentStaticScore[0] = 0;
    currentStaticScore[1] = 0;
    dynamicScore = 0;
    acTivePlayer = 0;
    player[acTivePlayer].classList.add('active');
    player[1].classList.remove('active');
    isGameOver = false;
    displayResults();
    roll.addEventListener('click', gameStep);
    hold.addEventListener('click', holdAction);
}
init();

function randomDice() {
    diceValue = Math.trunc(Math.random() * 6 + 1);
    return diceValue;
}

function selectActivePlayer() {
    for (let pl of player) {
        pl.classList.remove('active');
    }
    player[acTivePlayer].classList.add('active');
}

function switchPlayers() {
    if (acTivePlayer === 0) {
        acTivePlayer = 1;
    } else {
        acTivePlayer = 0;
    }
    selectActivePlayer();
}

function displayResults() {
    for (let curScore of currentScore) {
        curScore.innerHTML = '0';
    }
    currentScore[acTivePlayer].innerHTML = dynamicScore;
    staticScore[0].innerHTML = currentStaticScore[0];
    staticScore[1].innerHTML = currentStaticScore[1];
    if (diceValue) dice.innerHTML = diceValue;
}

function gameStep() {
    if (!isGameOver) {
        let rollDie = randomDice();
        if (rollDie !== 1) {
            dynamicScore += rollDie;
            displayResults();
        } else {
            dynamicScore = 0;
            displayResults();
            switchPlayers();
        }
    }
}

function holdAction() {
    currentStaticScore[acTivePlayer] += dynamicScore;
    displayResults();
    if (currentStaticScore[acTivePlayer] >= gameOverTrashHold) {
        gameOver();
        diceValue = `Player ${acTivePlayer + 1} has won!`;
        displayResults();
        return;
    }
    if (currentStaticScore[acTivePlayer] < gameOverTrashHold) {
        dynamicScore = 0;
        switchPlayers();
        displayResults();
    }
}

function gameOver() {
    roll.removeEventListener('click', gameStep);
    hold.removeEventListener('click', holdAction);
    isGameOver = true;
}

restart.addEventListener('click', init);