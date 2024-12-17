const fs = require("fs");
const input = fs.readFileSync("./resources/day4_input.txt", "utf-8");

const xmas = "XMAS";
const samx = "SAMX";
const rows = input.trim().split("\n");
const words = rows.map((row) =>
  [...row].map((char) => ({
    char: char,
    isSafe: false,
  }))
);
let numberOfXmas = 0;

const safeGet = (map, i, j) => {
  const row = map[i] || {};
  return row[j] || { char: "" };
};

function isLeftToRight(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i, j + k).char != xmas[k]) return false;
  }
  return true;
}

function isRightToLeft(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i, j - k).char != xmas[k]) return false;
  }
  return true;
}

function isTopToBottom(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i + k, j).char != xmas[k]) return false;
  }
  return true;
}

function isBottomToTop(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i - k, j).char != xmas[k]) return false;
  }
  return true;
}

function isTopLtoBottomR(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i + k, j + k).char != xmas[k]) return false;
  }
  return true;
}

function isBottomRtoTopL(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i - k, j - k).char != xmas[k]) return false;
  }
  return true;
}

function isTopRtoBottomL(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i + k, j - k).char != xmas[k]) return false;
  }
  return true;
}

function isBottomLtoTopR(words, i, j, xmas) {
  for (let k = 1; k < xmas.length; k++) {
    if (safeGet(words, i - k, j + k).char != xmas[k]) return false;
  }
  return true;
}

function flip(words, xmas) {
  let flipCounter = 0;
  let index = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[i][j].char == xmas[0]) {
        if (isLeftToRight(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isRightToLeft(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isTopToBottom(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isBottomToTop(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isTopLtoBottomR(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isBottomRtoTopL(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isTopRtoBottomL(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
        if (isBottomLtoTopR(words, i, j, xmas)) {
          flipCounter++;
          index.push([i, j]);
        }
      }
    }
  }
  console.table(index);
  return flipCounter;
}

console.log(flip(words, xmas));
