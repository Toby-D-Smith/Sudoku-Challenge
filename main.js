generateSudokuGrid();

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
function generateEmptyPuzzle() {
  const emptySudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  return emptySudoku;
}
const emptySudoku = generateEmptyPuzzle();
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
  showWinoOrLose(incorrectCells);
  if (incorrectCells.length === 0) {
    console.log("Correct!");
    return "Correct!";
  } else {
    console.log(incorrectCells);
    return incorrectCells;
  }
}
function showWinoOrLose(incorrectCellsArray) {
  document
    .querySelectorAll(".cell")
    .forEach((cell) => (cell.firstChild.style.backgroundColor = ""));
  document.body.style.backgroundColor = "";
  if (incorrectCellsArray.length === 0) {
    document.body.style.backgroundColor = "green";
  } else {
    let rowNodeList = document.querySelectorAll(".row");
    for (let i = 0; i < incorrectCellsArray.length; i++) {
      const row = incorrectCellsArray[i][0];
      const collumn = incorrectCellsArray[i][1];
      let rowNode = rowNodeList[row].childNodes;
      let wrongCell = rowNode[collumn];
      console.log(wrongCell);
      // wrongCell.style.backgroundColor = "red";
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
  // console.log(currentSudoku);
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
  document.body.style.backgroundColor = "";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.firstChild.value = "";
    cell.firstChild.style.backgroundColor = "";
  });
});
const solveButton = document.createElement("button");
buttonSection.appendChild(solveButton);
solveButton.classList.add("solveButton");
solveButton.innerText = "Solve Sudoku";
solveButton.addEventListener("click", function () {
  const mySudoku = getSudoku();
  const allSolutions = findAllSolutions(getSudoku());
  if (allSolutions.length === 0) {
    alert("No solution");
  }
  exampleSudoku(allSolutions[0]);
});

// solveSudoku(getSudoku());

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

function checkSudokuTheSame(sudoku1, sudoku2 = emptySudoku) {
  let areTheSame = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku1[i][j] != sudoku2[i][j]) {
        areTheSame = false;
      }
    }
  }
  return areTheSame;
}
function findAllSolutions(sudoku) {
  const solutionsArray = [];

  function solveSudoku(sudoku) {
    let nextCell = nextEmptyCell(sudoku);

    //Completed Sudoku
    if (!nextCell) {
      //Checks the solution is a new one
      let newSolution = true;
      solutionsArray.forEach((solutions) => {
        if (checkSudokuTheSame(sudoku, solutions)) {
          newSolution = false;
        }
      });

      //If a new Solution, add it to the array
      if (newSolution) {
        let newSudoku = mapToNewSudoku(sudoku);
        solutionsArray.push(newSudoku);
      }

      //Carry on until we have 2 solutions
      if (solutionsArray.length < 2) {
        return false;
      }
      return sudoku;
    }
    let rowIndex = nextCell[0];
    let collumnIndex = nextCell[1];

    //If the cell value works, got to the next cell
    for (let cellValue = 1; cellValue <= 9; cellValue++) {
      if (checkCellWorks(sudoku, rowIndex, collumnIndex, cellValue)) {
        sudoku[rowIndex][collumnIndex] = cellValue;
        let solvedReturn = solveSudoku(sudoku);

        //Carry on if we only have 1 solution
        if (solvedReturn === false) {
          sudoku[rowIndex][collumnIndex] = 0;
        }
      }
    }
    //When going back to previous cells, ensuring they're set to 0
    if (nextEmptyCell(sudoku)) {
      sudoku[rowIndex][collumnIndex] = 0;
    }
    return sudoku;
  }
  solveSudoku(sudoku);
  // exampleSudoku(solutionsArray[0]);
  return solutionsArray;
}

function createProblems(minimumDigits) {
  let sudokuPuzzle = generateEmptyPuzzle();
  let numberOfDigits = 0;
  const randomNumberBetween1and9 = () => Math.ceil(Math.random() * 9);
  let uniqueSolution = false;

  while (numberOfDigits < minimumDigits || uniqueSolution === false) {
    let randomRowIndex = randomNumberBetween1and9() - 1;
    let randomCollumnIndex = randomNumberBetween1and9() - 1;
    let randomCellValue = randomNumberBetween1and9();
    //Makes sure the cell is empty
    if (sudokuPuzzle[randomRowIndex][randomCollumnIndex] !== 0) {
      continue;
    }

    if (checkCellWorks(sudokuPuzzle, randomRowIndex, randomCollumnIndex, randomCellValue)) {
      let testSudoku = mapToNewSudoku(sudokuPuzzle);
      testSudoku[randomRowIndex][randomCollumnIndex] = randomCellValue;
      let solutions = findAllSolutions(testSudoku);

      //If there are solutions, add the digit
      if (solutions.length === 1) {
        uniqueSolution = true;
      }
      if (solutions.length !== 0) {
        numberOfDigits++;
        sudokuPuzzle[randomRowIndex][randomCollumnIndex] = randomCellValue;
      }
    }
  }
  exampleSudoku(sudokuPuzzle);
  return sudokuPuzzle;
}
function mapToNewSudoku(sudoku) {
  let newSudoku = generateEmptyPuzzle();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      newSudoku[i][j] = sudoku[i][j];
    }
  }
  return newSudoku;
}
