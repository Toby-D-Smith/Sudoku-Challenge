generateSudokuGrid();

const emptySudoku = [[], [], [], [], [], [], [], [], []];

const sudoku1 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

function generateSudokuGrid() {
  const sudokuGrid = document.createElement("table");
  sudokuGrid.setAttribute("id", "grid");
  document.body.appendChild(sudokuGrid);
  for (let i = 0; i < 9; i++) {
    let newRow = document.createElement("tr");
    newRow.classList.add("row");
    sudokuGrid.appendChild(newRow);

    for (let j = 0; j < 9; j++) {
      let newCell = document.createElement("td");
      newCell.classList.add("cell");
      newRow.appendChild(newCell);

      let cellInput = document.createElement("input");
      cellInput.classList.add("cellInput");
      cellInput.type = "text";
      cellInput.maxLength = "1";
      newCell.appendChild(cellInput);
    }
  }
}
function testSudoku(sudoku) {
  let incorrectCells = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let collumnIndex = 0; collumnIndex < 9; collumnIndex++) {
      currentCell = sudoku[rowIndex][collumnIndex];
      let isCellCorrect = checkCellWorks(sudoku, rowIndex, collumnIndex, currentCell);
      if (!isCellCorrect) {
        incorrectCells.push([rowIndex, collumnIndex]);
      }
    }
  }
  showWinorLose(incorrectCells);
  if (incorrectCells.length === 0) {
    console.log("Correct!");
    return "Correct!";
  } else {
    console.log(incorrectCells);
    return incorrectCells;
  }
}
function showWinorLose(incorrectCellsArray) {
  if (incorrectCellsArray.length === 0) {
    document.body.style.backgroundColor = "green";
  } else {
    let rowNodeList = document.querySelectorAll(".row");
    // console.log(rowNodeList);
    // console.log(incorrectCellsArray);
    for (let i = 0; i < incorrectCellsArray.length; i++) {
      const row = incorrectCellsArray[i][0];
      const collumn = incorrectCellsArray[i][1];
      let rowNode = rowNodeList[row].childNodes;
      let wrongCell = rowNode[collumn];
      console.log(wrongCell);
      wrongCell.style.backgroundColor = "red";
      wrongCell.firstChild.style.backgroundColor = "red";
    }
  }
}

function createBox(sudoku, rowLimit, collumnLimit) {
  const currentBox = [];
  for (let rowIndex = rowLimit[0]; rowIndex <= rowLimit[1]; rowIndex++) {
    for (let collumnIndex = collumnLimit[0]; collumnIndex <= collumnLimit[1]; collumnIndex++) {
      currentBox.push(sudoku[rowIndex][collumnIndex]);
    }
  }
  return currentBox;
}

function getSudoku() {
  let currentSudoku = [];
  let ListofRows = document.querySelectorAll(".row");
  ListofRows.forEach((rowNodeList) => {
    const cellsArray = Array.from(rowNodeList.childNodes);
    const sudokuRow = [];
    cellsArray.forEach((cell) =>
      sudokuRow.push(parseInt(cell.firstChild.value ? cell.firstChild.value : 0))
    );
    currentSudoku.push(sudokuRow);
  });
  console.log(currentSudoku);
  return currentSudoku;
}
function exampleSudoku(sudoku) {
  let ListofRows = document.querySelectorAll(".row");
  for (let i = 0; i < 9; i++) {
    currentSudokuRow = Array.from(ListofRows[i].childNodes);
    currentSudokuRow.forEach(
      (cell, index) => (cell.firstChild.value = sudoku[i][index] ? sudoku[i][index] : "")
    );
  }
}
const buttonSection = document.getElementById("button-section");

const testingButton = document.createElement("button");
buttonSection.appendChild(testingButton);
testingButton.classList.add("testingButton");
testingButton.innerText = "Test my Sudoku";
testingButton.addEventListener("click", function () {
  testSudoku(getSudoku());
});

const exampleButton = document.createElement("button");
buttonSection.appendChild(exampleButton);
exampleButton.classList.add("exampleButton");
exampleButton.innerText = "Sudoku Example";
exampleButton.addEventListener("click", function () {
  exampleSudoku(sudoku1);
});

const clearButton = document.createElement("button");
buttonSection.appendChild(clearButton);
clearButton.classList.add("clearButton");
clearButton.innerText = "Clear";
clearButton.addEventListener("click", function () {
  exampleSudoku(emptySudoku);
});

function solveSudoku(sudoku) {
  let nextCell = nextEmptyCell(sudoku);
  // console.log(nextCell);
  //No more empty cells
  if (!nextCell) {
    console.log(sudoku);
    return sudoku;
  }
  let rowIndex = nextCell[0];
  let collumnIndex = nextCell[1];

  // console.log(sudoku);
  for (let cellValue = 1; cellValue <= 9; cellValue++) {
    if (checkCellWorks(sudoku, rowIndex, collumnIndex, cellValue)) {
      sudoku[rowIndex][collumnIndex] = cellValue;
      sudoku = solveSudoku(sudoku);
    }
  }
  if (nextEmptyCell(sudoku)) {
    sudoku[rowIndex][collumnIndex] = 0;
  }
  exampleSudoku(sudoku);
  return sudoku;
}
solveSudoku(getSudoku());

function nextEmptyCell(sudoku) {
  for (rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (collumnIndex = 0; collumnIndex < 9; collumnIndex++) {
      if (sudoku[rowIndex][collumnIndex] === 0) {
        return [rowIndex, collumnIndex];
      }
    }
  }
  return null;
}
function checkCurrentRowWorks(sudoku, rowIndex, collumnIndex, value) {
  let currentRow = sudoku[rowIndex];
  let valueWorks = true;
  currentRow.forEach((cell, index) => {
    if (cell === value && collumnIndex !== index) {
      valueWorks = false;
    }
  });
  return valueWorks;
}
function checkCurrentCollumnWorks(sudoku, rowIndex, collumnIndex, value) {
  let currentCollumn = [];
  // sudoku[rowIndex][collumnIndex] = 0;
  for (let i = 0; i < 9; i++) {
    currentCollumn.push(sudoku[i][collumnIndex]);
  }
  let valueWorks = true;
  currentCollumn.forEach((cell, index) => {
    if (cell === value && rowIndex !== index) {
      valueWorks = false;
    }
  });
  return valueWorks;
}

function checkCurrentBoxWorks(sudoku, rowIndex, collumnIndex, value) {
  const boxRowBoundary = Math.floor(rowIndex / 3) * 3;
  const boxCollumnBoundary = Math.floor(collumnIndex / 3) * 3;
  sudoku[rowIndex][collumnIndex] = 0;
  const currentBox = createBox(
    sudoku,
    [boxRowBoundary, boxRowBoundary + 2],
    [boxCollumnBoundary, boxCollumnBoundary + 2]
  );
  let valueWorks = true;
  currentBox.forEach((cell, index) => {
    if (cell === value) {
      valueWorks = false;
    }
  });
  return valueWorks;
}

function checkCellWorks(sudoku, rowIndex, collumnIndex, value) {
  let result =
    checkCurrentRowWorks(sudoku, rowIndex, collumnIndex, value) &&
    checkCurrentCollumnWorks(sudoku, rowIndex, collumnIndex, value) &&
    checkCurrentBoxWorks(sudoku, rowIndex, collumnIndex, value);
  return result;
}
