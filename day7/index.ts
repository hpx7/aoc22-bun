import { file } from "bun";
import { sum } from "../helpers";

const input = await file("day7/input.txt").text();
const lines = input.split("\n");

type File = { type: "file"; name: string; size: number };
type Directory = { type: "dir"; name: string; contents: (File | Directory)[]; parentDir?: Directory };

const rootDir: Directory = {
  type: "dir",
  name: "/",
  contents: [],
};
parseDirs();

console.log(`part1: ${part1()}`);
console.log(`part2: ${part2()}`);

function part1() {
  const dirSizes: number[] = [];
  function getDirSize(currentDir: Directory) {
    let dirSize = 0;
    currentDir.contents.forEach((item) => {
      if (item.type === "file") {
        dirSize += item.size;
      } else {
        dirSize += getDirSize(item);
      }
    });
    dirSizes.push(dirSize);
    return dirSize;
  }
  getDirSize(rootDir);
  return sum(dirSizes.filter((dirSize) => dirSize < 100000));
}

function part2() {
  const dirSizes: number[] = [];
  function getDirSize(currentDir: Directory) {
    let dirSize = 0;
    currentDir.contents.forEach((item) => {
      if (item.type === "file") {
        dirSize += item.size;
      } else {
        dirSize += getDirSize(item);
      }
    });
    dirSizes.push(dirSize);
    return dirSize;
  }
  const usedSpace = getDirSize(rootDir);
  const unusedSpace = 70000000 - usedSpace;
  const amountToDelete = 30000000 - unusedSpace;
  return dirSizes.filter((dirSize) => dirSize > amountToDelete).sort((a, b) => a - b)[0];
}

function parseDirs() {
  let currentDir = rootDir;
  lines.forEach((line) => {
    if (line.startsWith("$ cd")) {
      const dirName = line.split(" ").slice(-1)[0];
      if (dirName === "..") {
        currentDir = currentDir.parentDir!;
      } else if (dirName !== "/") {
        for (const childDir of currentDir.contents) {
          if (childDir.type === "dir" && childDir.name === dirName) {
            currentDir = childDir;
            return;
          }
        }
      }
    } else if (line.startsWith("dir")) {
      currentDir.contents.push({
        type: "dir",
        name: line.split(" ")[1],
        contents: [],
        parentDir: currentDir,
      });
    } else if (/^\d/.test(line)) {
      const [size, name] = line.split(" ");
      currentDir.contents.push({
        type: "file",
        name,
        size: parseInt(size),
      });
    }
  });
}
