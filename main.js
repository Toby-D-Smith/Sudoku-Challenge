generateSudokuGrid();

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
function testUniquness(sudokuLine, index, type) {
  let sortedLine = sudokuLine.map((a) => a);
  sortedLine = sortedLine.sort();
  for (let i = 0; i < 9; i++) {
    if (sortedLine[i] !== i + 1) {
      console.log(`Failed on ${type} ${index + 1}`, sudokuLine);
      return;
    }
  }
  // console.log(`Succeed on ${type} ${index + 1}`);
}

function sudokuRowTest(sudoku) {
  sudoku.forEach((row, index) => testUniquness(row, index, "Row"));
}

function sudokuCollumnTest(sudoku) {
  for (let collumnIndex = 0; collumnIndex < 9; collumnIndex++) {
    const currentCollumn = [];
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      currentCollumn.push(sudoku[rowIndex][collumnIndex]);
    }
    testUniquness(currentCollumn, collumnIndex, "Collumn");
  }
}

function sudokuBoxTest(sudoku) {
  let boxNumber = 0;
  for (let boxRow = 0; boxRow < 8; boxRow += 3) {
    for (let boxCollumn = 0; boxCollumn < 8; boxCollumn += 3) {
      const currentBox = createBox(sudoku, [boxRow, boxRow + 2], [boxCollumn, boxCollumn + 2]);
      testUniquness(currentBox, boxNumber++, "Box");
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

function testSudoku(sudoku) {
  sudokuRowTest(sudoku);
  sudokuCollumnTest(sudoku);
  sudokuBoxTest(sudoku);
}

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

testSudoku(sudoku1);
// let cellNodeList = document.querySelectorAll(".cell");
// console.log(cellNodeList);
// cellNodeList.forEach((cell) => (cell.firstChild.value = "5"));
function getSudoku() {
  let currentSudoku = [];
  let ListofRows = document.querySelectorAll(".row");
  ListofRows.forEach((rowNodeList) => {
    const cellsArray = Array.from(rowNodeList.childNodes);
    const sudokuRow = [];
    cellsArray.forEach((cell) =>
      parseInt(sudokuRow.push(cell.firstChild.value ? cell.firstChild.value : 0))
    );
    currentSudoku.push(sudokuRow);
  });
  console.log(currentSudoku);
}

// const testingButton = document.createElement("button");
// document.body.appendChild
