import { file } from "bun";

const input = await file("day8/input.txt").text();

const grid = input.split("\n").map((col) => [...col].map((x) => parseInt(x)));
const numRows = grid.length;
const numCols = grid[0].length;

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  let total = 0;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (isVisible(i, j)) {
        total++;
      }
    }
  }
  return total;
}

function part2() {
  let maxScore = 0;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const score = scenicScore(i, j);
      if (score > maxScore) {
        maxScore = score;
      }
    }
  }
  return maxScore;
}

function isVisible(i: number, j: number): boolean {
  const val = grid[i][j];
  return isShorterNorth(i, j, val) || isShorterSouth(i, j, val) || isShorterWest(i, j, val) || isShorterEast(i, j, val);
}

function isShorterNorth(i: number, j: number, height: number): boolean {
  return i === 0 || (grid[i - 1][j] < height && isShorterNorth(i - 1, j, height));
}

function isShorterSouth(i: number, j: number, height: number): boolean {
  return i === numRows - 1 || (grid[i + 1][j] < height && isShorterSouth(i + 1, j, height));
}

function isShorterWest(i: number, j: number, height: number): boolean {
  return j === 0 || (grid[i][j - 1] < height && isShorterWest(i, j - 1, height));
}

function isShorterEast(i: number, j: number, height: number): boolean {
  return j === numCols - 1 || (grid[i][j + 1] < height && isShorterEast(i, j + 1, height));
}

function scenicScore(i: number, j: number): number {
  const height = grid[i][j];

  let northScore = 0;
  // north
  for (let y = i - 1; y >= 0; y--) {
    northScore++;
    if (grid[y][j] >= height) {
      break;
    }
  }

  // south
  let southScore = 0;
  for (let y = i + 1; y < numRows; y++) {
    southScore++;
    if (grid[y][j] >= height) {
      break;
    }
  }

  // west
  let westScore = 0;
  for (let x = j - 1; x >= 0; x--) {
    westScore++;
    if (grid[i][x] >= height) {
      break;
    }
  }

  // east
  let eastScore = 0;
  for (let x = j + 1; x < numCols; x++) {
    eastScore++;
    if (grid[i][x] >= height) {
      break;
    }
  }

  return northScore * southScore * westScore * eastScore;
}
