import { file } from "bun";

const input = await file("day5/input.txt").text();

const [stackLines, instructionLines] = input.split("\n\n").map((x) => x.split("\n"));

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  const numStacks = Math.ceil(stackLines[0].length / 4);
  const stacks = [...Array(numStacks)].map((_) => [] as string[]);
  for (const line of stackLines) {
    for (let i = 0; i < line.length; i += 4) {
      const crate = line[i + 1];
      if (crate !== " ") {
        stacks[i / 4].unshift(crate);
      }
    }
  }

  const regex = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
  for (const line of instructionLines) {
    const match = line.match(regex);
    if (match !== null) {
      const [amount, from, to] = match.slice(1).map((x) => parseInt(x));
      for (let i = 0; i < amount; i++) {
        const crate = stacks[from - 1].pop()!;
        stacks[to - 1].push(crate);
      }
    }
  }

  return stacks.map((stack) => stack.slice(-1)[0]).join("");
}

function part2() {
  const numStacks = Math.ceil(stackLines[0].length / 4);
  const stacks = [...Array(numStacks)].map((_) => [] as string[]);
  for (const line of stackLines) {
    for (let i = 0; i < line.length; i += 4) {
      const crate = line[i + 1];
      if (crate !== " ") {
        stacks[i / 4].unshift(crate);
      }
    }
  }

  const regex = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
  for (const line of instructionLines) {
    const match = line.match(regex);
    if (match !== null) {
      const [amount, from, to] = match.slice(1).map((x) => parseInt(x));
      const crates = stacks[from - 1].splice(-amount);
      stacks[to - 1].push(...crates);
    }
  }

  return stacks.map((stack) => stack[stack.length - 1]).join("");
}
