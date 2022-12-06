import { file } from "bun";
import { sum } from "../helpers";

const input = await file("day3/input.txt").text();

const lines = input.split("\n");

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  const priorities = lines.map((line) => {
    const halfLength = line.length / 2;
    const firstHalf = line.slice(0, halfLength);
    const secondHalf = line.slice(halfLength);
    const intersection = getIntersection(firstHalf, secondHalf);
    return getPriority(intersection);
  });
  return sum(priorities);
}

function part2() {
  let total = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const a = lines[i];
    const b = lines[i + 1];
    const c = lines[i + 2];
    const intersection = getIntersection3(a, b, c);
    total += getPriority(intersection);
  }
  return total;
}

function getIntersection(str1: string, str2: string): string {
  const intersection = [...str1].find((c) => str2.includes(c));
  if (intersection === undefined) {
    throw new Error("Invalid");
  }
  return intersection;
}

function getIntersection3(str1: string, str2: string, str3: string): string {
  const intersection = [...str1].find((c) => str2.includes(c) && str3.includes(c));
  if (intersection === undefined) {
    throw new Error("Invalid");
  }
  return intersection;
}

function getPriority(c: string): number {
  if (c >= "a" && c <= "z") {
    return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (c >= "A" && c <= "Z") {
    return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
  throw new Error("Invalid");
}
