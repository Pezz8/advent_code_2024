const fs = require("fs");
const input = fs.readFileSync("./resources/day2_input.txt", "utf-8");

let data = [];
let safe_counter = 0;

//load array
input.split("\n").forEach((line) => {
  if (line) {
    const row = line.split(" ").map((token) => parseInt(token, 10));
    data.push(row);
  }
});

function is_increasing(report) {
  return report[0] - report[1] < 0;
}

function is_decreasing(report) {
  return report[0] - report[1] > 0;
}

function is_all_increasing(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = report[i] - report[i + 1] < 0;
    if (!flag) return false;
  }
  return flag;
}

function is_all_decreasing(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = report[i] - report[i + 1] > 0;
    if (!flag) return false;
  }
  return flag;
}

function is_all_in_range(report) {
  let flag = true;
  for (let i = 0; i < report.length - 1; i++) {
    flag = is_in_range(report[i], report[i + 1]);
    if (!flag) return false;
  }
  return flag;
}

function is_in_range(a, b) {
  return Math.abs(a - b) < 4 && Math.abs(a - b) > 0;
}

function is_safe(report) {
  let safe = true;
  if (is_increasing(report)) {
    safe = is_all_increasing(report) && is_all_in_range(report);
  } else if (is_decreasing(report)) {
    safe = is_all_decreasing(report) && is_all_in_range(report);
  } else return false;
  return safe;
}

function dampener(report) {
  let flag = false;
  let dampened_report = report.map((_, i) =>
    report.filter((_, index) => index !== i)
  );
  for (let i = 0; i < dampened_report.length; i++) {
    flag = is_safe(dampened_report[i]);
    if (flag) return true;
  }
  return flag;
}

for (let i = 0; i < data.length; i++) {
  if (is_safe(data[i])) safe_counter++;
  else {
    if (dampener(data[i])) safe_counter++;
  }
}

console.log(safe_counter);
