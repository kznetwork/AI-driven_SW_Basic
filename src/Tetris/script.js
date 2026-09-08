// 캔버스와 2D 그리기 도구를 준비합니다.
const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');
const nextCanvas = document.getElementById('next-piece');
const nextContext = nextCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const gameStatusElement = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

// 테트리스 보드는 가로 10칸, 세로 20칸으로 구성합니다.
const BOARD_COLUMNS = 10;
const BOARD_ROWS = 20;
const CELL_SIZE = canvas.width / BOARD_COLUMNS;

// 0은 비어 있는 칸을 뜻합니다. 이후 블록이 쌓이면 색상 값을 저장할 수 있습니다.
const board = Array.from(
  { length: BOARD_ROWS },
  () => Array(BOARD_COLUMNS).fill(0),
);

// 각 테트로미노의 모양은 1이 채워진 칸, 0이 빈 칸인 2차원 배열로 표현합니다.
// 색상은 블록을 화면에서 쉽게 구분할 수 있도록 종류별로 지정합니다.
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#00d9ff' },
  O: { shape: [[1, 1], [1, 1]], color: '#ffd500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a855f7' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#22c55e' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' },
};

const BASE_DROP_INTERVAL = 500;
const DROP_INTERVAL_STEP = 50;
const MIN_DROP_INTERVAL = 100;
const SCORE_PER_LEVEL = 1000;
const LINE_CLEAR_SCORES = [0, 100, 300, 500, 800];
const tetrominoTypes = Object.keys(TETROMINOES);

// 무작위 블록을 보드 맨 위 중앙에 생성합니다.
function createPiece() {
  const type = tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
  const tetromino = TETROMINOES[type];

  return {
    shape: tetromino.shape,
    color: tetromino.color,
    x: Math.floor((BOARD_COLUMNS - tetromino.shape[0].length) / 2),
    y: 0,
  };
}

let currentPiece = createPiece();
let nextPiece = createPiece();
let dropTimer = null;
let score = 0;
let level = 1;

// 보드의 한 칸을 채우고 테두리를 그립니다.
function drawCell(column, row, color) {
  const x = column * CELL_SIZE;
  const y = row * CELL_SIZE;

  context.fillStyle = color;
  context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  context.strokeStyle = '#334155';
  context.lineWidth = 1;
  context.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
}

// 보드에 저장된 칸과 빈 칸의 격자를 모두 그립니다.
function drawBoard() {
  for (let row = 0; row < BOARD_ROWS; row += 1) {
    for (let column = 0; column < BOARD_COLUMNS; column += 1) {
      const cellColor = board[row][column] || '#0f172a';
      drawCell(column, row, cellColor);
    }
  }
}

// 현재 떨어지는 블록의 채워진 칸만 보드 좌표에 맞춰 그립니다.
function drawCurrentPiece() {
  currentPiece.shape.forEach((row, pieceRow) => {
    row.forEach((cell, pieceColumn) => {
      if (cell === 1) {
        drawCell(
          currentPiece.x + pieceColumn,
          currentPiece.y + pieceRow,
          currentPiece.color,
        );
      }
    });
  });
}

function drawNextPiece() {
  const previewCellSize = 24;
  const pieceWidth = nextPiece.shape[0].length * previewCellSize;
  const pieceHeight = nextPiece.shape.length * previewCellSize;
  const startX = (nextCanvas.width - pieceWidth) / 2;
  const startY = (nextCanvas.height - pieceHeight) / 2;

  nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  nextPiece.shape.forEach((row, pieceRow) => {
    row.forEach((cell, pieceColumn) => {
      if (cell === 0) {
        return;
      }

      const x = startX + pieceColumn * previewCellSize;
      const y = startY + pieceRow * previewCellSize;
      nextContext.fillStyle = nextPiece.color;
      nextContext.fillRect(x, y, previewCellSize, previewCellSize);
      nextContext.strokeStyle = '#334155';
      nextContext.strokeRect(x + 0.5, y + 0.5, previewCellSize - 1, previewCellSize - 1);
    });
  });
}

// 캔버스 초기화 후 보드와 현재 블록을 순서대로 그립니다.
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawCurrentPiece();
  drawNextPiece();
}

// 지정한 위치에서 보드 경계나 고정 블록과 겹치는지 판정합니다.
function hasCollision(piece, nextX = piece.x, nextY = piece.y) {
  return piece.shape.some((row, pieceRow) => (
    row.some((cell, pieceColumn) => {
      if (cell === 0) {
        return false;
      }

      const boardX = nextX + pieceColumn;
      const boardY = nextY + pieceRow;
      const isOutsideBoard = (
        boardX < 0
        || boardX >= BOARD_COLUMNS
        || boardY < 0
        || boardY >= BOARD_ROWS
      );

      return isOutsideBoard || board[boardY][boardX] !== 0;
    })
  ));
}

// 현재 블록의 셀을 보드에 기록해 고정합니다.
function lockCurrentPiece() {
  currentPiece.shape.forEach((row, pieceRow) => {
    row.forEach((cell, pieceColumn) => {
      if (cell === 1) {
        board[currentPiece.y + pieceRow][currentPiece.x + pieceColumn] = (
          currentPiece.color
        );
      }
    });
  });
}

// 완성된 행을 동시에 제거하고, 제거한 수만큼 빈 행을 보드 위에 채웁니다.
function clearCompletedLines() {
  const remainingRows = board.filter((row) => (
    row.some((cell) => cell === 0)
  ));
  const clearedLineCount = BOARD_ROWS - remainingRows.length;

  if (clearedLineCount === 0) {
    return;
  }

  const emptyRows = Array.from(
    { length: clearedLineCount },
    () => Array(BOARD_COLUMNS).fill(0),
  );

  board.splice(0, BOARD_ROWS, ...emptyRows, ...remainingRows);
  score += LINE_CLEAR_SCORES[clearedLineCount];
  level = Math.floor(score / SCORE_PER_LEVEL) + 1;
  scoreElement.textContent = score;
  levelElement.textContent = level;
}

function stopDropTimer() {
  if (dropTimer !== null) {
    clearInterval(dropTimer);
    dropTimer = null;
  }
}

function endGame() {
  stopDropTimer();
  gameStatusElement.textContent = '게임 오버';
}

function getDropInterval() {
  return Math.max(
    MIN_DROP_INTERVAL,
    BASE_DROP_INTERVAL - (level - 1) * DROP_INTERVAL_STEP,
  );
}

// 한 칸 내려갈 수 없으면 블록을 고정하고 다음 블록으로 전환합니다.
function dropPiece() {
  if (!hasCollision(currentPiece, currentPiece.x, currentPiece.y + 1)) {
    currentPiece.y += 1;
  } else {
    const previousLevel = level;
    lockCurrentPiece();
    clearCompletedLines();
    currentPiece = nextPiece;
    nextPiece = createPiece();

    if (hasCollision(currentPiece)) {
      endGame();
    } else if (level !== previousLevel) {
      startDropTimer();
    }
  }

  draw();
}

function startDropTimer() {
  stopDropTimer();
  dropTimer = setInterval(dropPiece, getDropInterval());
}

function restartGame() {
  board.forEach((row) => row.fill(0));
  score = 0;
  level = 1;
  scoreElement.textContent = score;
  levelElement.textContent = level;
  gameStatusElement.textContent = '';
  currentPiece = createPiece();
  nextPiece = createPiece();
  draw();
  startDropTimer();
}

function movePiece(horizontalOffset) {
  const nextX = currentPiece.x + horizontalOffset;

  if (!hasCollision(currentPiece, nextX, currentPiece.y)) {
    currentPiece.x = nextX;
    draw();
  }
}

function rotateClockwise(shape) {
  return shape[0].map((_, column) => (
    shape.map((row) => row[column]).reverse()
  ));
}

function rotateCurrentPiece() {
  const rotatedShape = rotateClockwise(currentPiece.shape);
  const rotatedPiece = {
    ...currentPiece,
    shape: rotatedShape,
  };

  if (!hasCollision(rotatedPiece)) {
    currentPiece.shape = rotatedShape;
    draw();
  }
}

function hardDropPiece() {
  while (!hasCollision(currentPiece, currentPiece.x, currentPiece.y + 1)) {
    currentPiece.y += 1;
  }

  dropPiece();
}

function handleKeydown(event) {
  if (dropTimer === null) {
    return;
  }

  const controls = {
    ArrowLeft: () => movePiece(-1),
    ArrowRight: () => movePiece(1),
    ArrowDown: dropPiece,
    ArrowUp: rotateCurrentPiece,
    Space: hardDropPiece,
  };
  const action = controls[event.code];

  if (action) {
    event.preventDefault();
    action();
  }
}

document.addEventListener('keydown', handleKeydown);
restartButton.addEventListener('click', restartGame);
draw();
startDropTimer();
