const fs = require("fs");
const input = fs.readFileSync("./resources/day2_input.txt", "utf-8");

let data = [];
let safeCounter = 0;

//load array
input.split("\n").forEach((line) => {
  if (line) {
    const row = line.split(" ").map((token) => parseInt(token, 10));
    data.push(row);
  }
});

function isIncreasing(report) {
  return report[0] - report[1] < 0;
}

function isDecreasing(report) {
  return report[0] - report[1] > 0;
}

function isAllIncreasing(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = report[i] - report[i + 1] < 0;
    if (!flag) return false;
  }
  return flag;
}

function isAllDecreasing(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = report[i] - report[i + 1] > 0;
    if (!flag) return false;
  }
  return flag;
}

function isAllInRange(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = isInRange(report[i], report[i + 1]);
    if (!flag) return false;
  }
  return flag;
}

function isInRange(a, b) {
  return Math.abs(a - b) < 4 && Math.abs(a - b) > 0;
}

function isSafe(report) {
  let safe = true;
  if (isIncreasing(report)) {
    safe = isAllIncreasing(report) && isAllInRange(report);
  } else if (isDecreasing(report)) {
    safe = isAllDecreasing(report) && isAllInRange(report);
  } else return false;
  return safe;
}

function dampener(report) {
  let flag = false;
  let dampened_report = report.map((_, i) =>
    report.filter((_, index) => index !== i)
  );
  for (let i = 0; i < dampened_report.length; i++) {
    flag = isSafe(dampened_report[i]);
    if (flag) return true;
  }
  return flag;
}

for (let i = 0; i < data.length; i++) {
  if (isSafe(data[i])) safeCounter++;
  else {
    if (dampener(data[i])) safeCounter++;
  }
}

console.log(safeCounter);
