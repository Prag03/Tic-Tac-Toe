const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellOptions = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]");
const restartButton = document.getElementById('restartButton')
let oTurn; //not determined means false

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
  oTurn = false;
  cellOptions.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show')
}
function handleClick(e) {
  //get the cell where the target event happened
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
function isDraw(){
    return [...cellOptions].every(cell =>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(O_CLASS)
    })
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${ oTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}
function placeMark(cell, currentClass) {
  //classLIst returns css classes in form of an array
  cell.classList.add(currentClass);
}
function swapTurns() {
  oTurn = !oTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  //some will stop if any combination is found true
  //combination is the call back function for some
  //index is the callback function for every
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellOptions[index].classList.contains(currentClass);
    });
  });
}
