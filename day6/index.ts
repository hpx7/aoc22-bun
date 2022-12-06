import { file } from "bun";

const input = await file("day6/input.txt").text();

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  const len = 4;
  for (let i = 0; i < input.length; i++) {
    const packetMarker = input.slice(i, i + len);
    const uniqueChars = new Set([...packetMarker]);
    if (uniqueChars.size === len) {
      return i + len;
    }
  }
}

function part2() {
  const len = 14;
  for (let i = 0; i < input.length; i++) {
    const packetMarker = input.slice(i, i + len);
    const uniqueChars = new Set([...packetMarker]);
    if (uniqueChars.size === len) {
      return i + len;
    }
  }
}
