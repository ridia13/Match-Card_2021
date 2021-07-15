"use strict";
const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
const colorCopy = colors.concat(colors);
let shuffled = [];

function shuffle() { //피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }

}

function createCard(i) { //.card > .card-inner> (.card-front + .card-back)
  // for (let i = 0; i < total; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
  // }
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const $wrapper = document.querySelector('#wrapper');
    const card = createCard(i);
    $wrapper.appendChild(card);
  }

  const $cards = document.querySelectorAll('.card');
  $cards.forEach((card, index, parent) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 50 * index);

    setTimeout(() => {
      card.classList.remove('flipped');
    }, 4000);
  })
}

startGame();

function init() {}

init();