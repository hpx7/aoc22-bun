import { file } from "bun";

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
  let ans = 0;
  function getDirSize(currentDir: Directory) {
    let dirSize = 0;
    currentDir.contents.forEach((item) => {
      if (item.type === "file") {
        dirSize += item.size;
      } else {
        dirSize += getDirSize(item);
      }
    });
    if (dirSize < 100000) {
      ans += dirSize;
    }
    return dirSize;
  }
  getDirSize(rootDir);
  return ans;
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
    if (line.startsWith("$")) {
      if (line === "$ cd /") {
        // do nothing
      } else if (line === "$ ls") {
        // do nothing
      } else if (line === "$ cd ..") {
        currentDir = currentDir.parentDir!;
        // console.log("cd", currentDir, filesystem, "\n");
      } else {
        // $ cd <dirName>
        const dirName = line.split(" ").slice(-1)[0];
        for (const childDir of currentDir.contents) {
          if (childDir.type === "dir" && childDir.name === dirName) {
            currentDir = childDir;
            // console.log("cd", currentDir, filesystem, "\n");
            break;
          }
        }
      }
    } else {
      if (line.startsWith("dir")) {
        currentDir.contents.push({
          type: "dir",
          name: line.split(" ")[1],
          contents: [],
          parentDir: currentDir,
        });
      } else {
        const [size, name] = line.split(" ");
        currentDir.contents.push({
          type: "file",
          name,
          size: parseInt(size),
        });
      }
    }
  });
}
