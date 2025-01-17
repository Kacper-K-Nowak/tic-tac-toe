const fields = document.querySelectorAll(".field");
const currentMark = document.querySelector(".mark");
const resetButton = document.querySelector("button");

let currentPlayer = 1;
let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

class targetField {
  constructor(field) {
    this.row = field.dataset.row;
    this.column = field.dataset.column;
  }
}

function isEmpty(target) {
  return board[target.row][target.column] == null;
}

function checkPlayerTurn() {
  return currentPlayer ? "X" : "O";
}

function addToBoard(field, target) {
  const mark = checkPlayerTurn();
  field.textContent = mark;
  board[target.row][target.column] = mark;
}

function nextPlayer() {
  currentPlayer ? (currentPlayer = 0) : (currentPlayer = 1);
  currentMark.textContent = checkPlayerTurn();
}

function checkArray(arr) {
  if (arr.every((v) => v !== null && v === arr[0])) {
    return true;
  }
}

function checkRow() {
  let win;
  board.forEach((row) => {
    if (checkArray(row)) {
      win = true;
    }
  });
  return win;
}

function checkColumn() {
  let columns = [[], [], []];

  board.forEach((row) => {
    for (let i = 0; i < 3; i++) {
      columns[i].push(row[i]);
    }
  });

  let win;

  columns.forEach((column) => {
    if (checkArray(column)) win = true;
  });

  return win;
}

function checkDiagonal() {
  let diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  let win;

  diagonals.forEach((diag) => {
    if (checkArray(diag)) win = true;
  });

  return win;
}

function resetBoard() {
  fields.forEach((field) => {
    field.textContent = "";
  });
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

function checkWin() {
  if (checkRow() || checkColumn() || checkDiagonal()) {
    setTimeout(() => {
      alert("WIN!!!!!!!!");
      resetBoard();
    }, 0.2);
  }
}

function playTurn() {
  const target = new targetField(this);

  if (!isEmpty(target)) {
    return;
  }

  addToBoard(this, target);

  checkWin();

  nextPlayer();
}

fields.forEach((field) => {
  field.addEventListener("click", playTurn);
});

resetButton.addEventListener("click", resetBoard);
