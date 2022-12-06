import { file } from "bun";
import { sum } from "../helpers";

const input = await file("day2/input.txt").text();

const lines = input.split("\n");

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  const scores = lines.map((line) => {
    const opponentChoice = line[0] as "A" | "B" | "C";
    const myChoice = line[2] as "X" | "Y" | "Z";
    const outcome = getOutcome(opponentChoice, myChoice);
    return score(myChoice, outcome);
  });
  return sum(scores);
}

function part2() {
  const outcomeLookup = {
    X: "lost",
    Y: "draw",
    Z: "won",
  } as const;
  const scores = lines.map((line) => {
    const opponentChoice = line[0] as "A" | "B" | "C";
    const encodedOutcome = line[2] as "X" | "Y" | "Z";
    const outcome = outcomeLookup[encodedOutcome];
    const myChoice = getMyChoice(opponentChoice, outcome);
    return score(myChoice, outcome);
  });
  return sum(scores);
}

function getOutcome(opponentChoice: "A" | "B" | "C", myChoice: "X" | "Y" | "Z"): "lost" | "draw" | "won" {
  if (
    (opponentChoice === "A" && myChoice === "X") ||
    (opponentChoice === "B" && myChoice === "Y") ||
    (opponentChoice === "C" && myChoice === "Z")
  ) {
    return "draw";
  } else if (
    (opponentChoice === "A" && myChoice === "Y") ||
    (opponentChoice === "B" && myChoice === "Z") ||
    (opponentChoice === "C" && myChoice === "X")
  ) {
    return "won";
  } else if (
    (opponentChoice === "A" && myChoice === "Z") ||
    (opponentChoice === "B" && myChoice === "X") ||
    (opponentChoice === "C" && myChoice === "Y")
  ) {
    return "lost";
  }
  throw new Error("Invalid");
}

function getMyChoice(opponentChoice: "A" | "B" | "C", outcome: "lost" | "draw" | "won"): "X" | "Y" | "Z" {
  if (
    (opponentChoice === "A" && outcome === "draw") ||
    (opponentChoice === "B" && outcome === "lost") ||
    (opponentChoice === "C" && outcome === "won")
  ) {
    return "X";
  } else if (
    (opponentChoice === "A" && outcome === "won") ||
    (opponentChoice === "B" && outcome === "draw") ||
    (opponentChoice === "C" && outcome === "lost")
  ) {
    return "Y";
  } else if (
    (opponentChoice === "A" && outcome === "lost") ||
    (opponentChoice === "B" && outcome === "won") ||
    (opponentChoice === "C" && outcome === "draw")
  ) {
    return "Z";
  }
  throw new Error("Invalid");
}

function score(myChoice: "X" | "Y" | "Z", outcome: "lost" | "draw" | "won"): number {
  let score = 0;
  if (myChoice === "X") {
    score += 1;
  } else if (myChoice === "Y") {
    score += 2;
  } else if (myChoice === "Z") {
    score += 3;
  }
  if (outcome === "draw") {
    score += 3;
  } else if (outcome === "won") {
    score += 6;
  }
  return score;
}
