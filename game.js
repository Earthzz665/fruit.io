const cardsArray = [
    { name: 'A', image: '🅰️' },
    { name: 'B', image: '🅱️' },
    { name: 'C', image: '🅲️' },
    { name: 'D', image: '🅳️' },
    { name: 'A', image: '🅰️' },
    { name: 'B', image: '🅱️' },
    { name: 'C', image: '🅲️' },
    { name: 'D', image: '🅳️' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledCards = cardsArray.sort(() => 0.5 - Math.random());

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.setAttribute('data-index', index);
        cardElement.innerHTML = '?';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = cardsArray[this.getAttribute('data-index')].image;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name')) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '?';
        secondCard.innerHTML = '?';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener('DOMContentLoaded', createBoard);
