import { file } from "bun";

const input = await file("day4/input.txt").text();

const lines = input.split("\n");

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  let count = 0;
  lines.forEach((line) => {
    const [left, right] = line.split(",");
    const [leftMin, leftMax] = left.split("-").map((x) => parseInt(x));
    const [rightMin, rightMax] = right.split("-").map((x) => parseInt(x));
    if (
      isRangeContained(leftMin, leftMax, rightMin, rightMax) ||
      isRangeContained(rightMin, rightMax, leftMin, leftMax)
    ) {
      count++;
    }
  });
  return count;
}

function part2() {
  let count = 0;
  lines.forEach((line) => {
    const [left, right] = line.split(",");
    const [leftMin, leftMax] = left.split("-").map((x) => parseInt(x));
    const [rightMin, rightMax] = right.split("-").map((x) => parseInt(x));
    if (
      isRangeOverlapping(leftMin, leftMax, rightMin, rightMax) ||
      isRangeOverlapping(rightMin, rightMax, leftMin, leftMax)
    ) {
      count++;
    }
  });
  return count;
}

function isRangeContained(leftMin: number, leftMax: number, rightMin: number, rightMax: number) {
  return rightMin >= leftMin && rightMax <= leftMax;
}

function isRangeOverlapping(leftMin: number, leftMax: number, rightMin: number, rightMax: number) {
  return (leftMin >= rightMin && leftMin <= rightMax) || (leftMax >= rightMin && leftMax <= rightMax);
}
