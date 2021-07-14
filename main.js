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

function createCard() {
  for (let i = 0; i < total; i++) {
    const $wrapper = document.querySelector('#wrapper');
    const card = document.createElement('div');
    card.classList.add('card');
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    $wrapper.appendChild(card);
  }
}

function gameStart(){
  createCard();
}

function init(){
  gameStart();
}

init();