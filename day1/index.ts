import { file } from "bun";
import { sum } from "../helpers";

const input = await file("day1/input.txt").text();

const groups = input.split("\n\n");

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  let maxTotal = 0;
  groups.forEach((group) => {
    const amounts = group.split("\n").map((x) => parseInt(x));
    const total = sum(amounts);
    if (total > maxTotal) {
      maxTotal = total;
    }
  });
  return maxTotal;
}

function part2() {
  const totals: number[] = [];
  groups.forEach((group) => {
    const amounts = group.split("\n").map((x) => parseInt(x));
    const total = sum(amounts);
    totals.push(total);
  });
  totals.sort((a, b) => b - a);
  const top3 = totals.slice(0, 3);
  return sum(top3);
}
