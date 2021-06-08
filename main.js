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

function sudokuRowTest(sudoku) {
  sudoku.forEach((row, index) => testUniquness(row, index));
}

function sudokuCollumnTest(sudoku) {
  for (let collumnIndex = 0; collumnIndex < 9; collumnIndex++) {
    const currentCollumn = [];
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      currentCollumn.push(sudoku[rowIndex][collumnIndex]);
    }
    testUniquness(currentCollumn, collumnIndex);
  }
}

function testUniquness(sudokuLine, index) {
  let sortedLine = sudokuLine.map((a) => a);
  sortedLine = sortedLine.sort();
  for (let i = 0; i < 9; i++) {
    if (sortedLine[i] !== i + 1) {
      console.log(`Failed on ${index + 1}`, sudokuLine);
      return;
    }
  }
  console.log(`Succeed on ${index + 1}`, sudokuLine);
}
function testSudoku() {
  sudokuRowTest(sudoku1);
  sudokuCollumnTest(sudoku1);
}
function sudokuBoxTest(sudoku) {
  let boxNumber = 0;
  for (let boxRow = 0; boxRow < 8; boxRow += 3) {
    for (let boxCollumn = 0; boxCollumn < 8; boxCollumn += 3) {
      createBox(sudoku, [boxRow, boxRow + 2], [boxCollumn, boxCollumn + 2], boxNumber++);
    }
  }
}

function createBox(sudoku, rowLimit, collumnLimit, boxNumber) {
  const currentBox = [];
  for (let rowIndex = rowLimit[0]; rowIndex <= rowLimit[1]; rowIndex++) {
    for (let collumnIndex = collumnLimit[0]; collumnIndex <= collumnLimit[1]; collumnIndex++) {
      currentBox.push(sudoku[rowIndex][collumnIndex]);
    }
  }
  testUniquness(currentBox, boxNumber);
}
sudokuBoxTest(sudoku1);
