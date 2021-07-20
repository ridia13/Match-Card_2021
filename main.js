"use strict";

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
const colorCopy = colors.concat(colors);
const $msg = document.querySelector('#js-msg');
let shuffled = [];
let clicked = [];
let completed = [];

function shuffle() { //피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) { //.card > .card-inner> (.card-front + .card-back)
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
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const $wrapper = document.querySelector('#wrapper');
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
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

function onClickCard() {
  this.classList.toggle('flipped');
  clicked.push(this);

  if (clicked.length != 2) {
    return;
  }
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;

  if (firstBackColor !== secondBackColor) {
    setTimeout(() => {
      clicked[0].classList.remove('flipped');
      clicked[1].classList.remove('flipped');
      clicked = [];
    }, 500);
    return;
  }
  completed = completed.concat(clicked);
  clicked = [];

  if (completed.length !== total) {
    return;
  }
  $msg.textContent = "Congratulations!!";
}

function init() {
  startGame();
}
init();