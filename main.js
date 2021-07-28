"use strict";

let TOTAL = 0;
const $wrapper = document.querySelector('#wrapper');
const $msg = document.querySelector('#js-msg');
const $form = document.querySelector('form'),
  $input = $form.querySelector('#js-input');
const colors = [
  'red', 'orange', 'yellow', 'green', 'powderblue', 'greenyellow', 'purple', 'white', 'pink', 'plum'
];
let colorSlice = [];
let colorCopy = [];
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;

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

function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  clickable = false;
  startGame();
  $msg.textContent = '';
}
let startTime = {};
let endTime = {};

function startGame() {
  shuffle();
  for (let i = 0; i < TOTAL; i++) {
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
      clickable = true;
      startTime = new Date().getTime();
    }, 4000);
  })
}

function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) { //짝 맞춘 카드
    return;
  }
  this.classList.toggle('flipped');
  clicked.push(this);

  if (clicked.length != 2) {
    return;
  }

  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor !== secondBackColor) {
    clickable = false;
    setTimeout(() => {
      clicked[0].classList.remove('flipped');
      clicked[1].classList.remove('flipped');
      clicked = [];
      clickable = true;
    }, 500);
    return;
  }
  completed = completed.concat(clicked);
  clicked = [];
  if (completed.length !== parseInt(TOTAL)) {
    return;
  }
  endTime = new Date().getTime();
  let time = Math.floor((endTime - startTime) / 1000);
  $msg.textContent = `Congratulations!! It took ${time}s.`;
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function getTotal(e) {
  e.preventDefault();
  if($input.value % 2 !== 0 || $input.value > 20){
    $input.value = '';
    return;
  }
  TOTAL = $input.value;
  colorSlice = colors.slice(0, TOTAL / 2);
  colorCopy = colorSlice.concat(colorSlice);
  $form.style.display = 'none';
  startGame();
}

function init() {
  $form.addEventListener('submit', getTotal);
}
init();