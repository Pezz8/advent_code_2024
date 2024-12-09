const fs = require("fs");
const input = fs.readFileSync("./resources/day3_input.txt", "utf-8");

const regex = /(do\(\))|(don\'t\(\))|mul\((\d{1,3}),(\d{1,3})\)/g;
let sumOfProducts = 0;
let match = regex.exec(input);
let doFlag = true;

while (match) {
  if (match[1] == "do()") {
    doFlag = true;
  } else if (match[2] == "don't()") {
    doFlag = false;
  } else if (doFlag) {
    const mulX = match[3];
    const mulY = match[4];
    const product = mulX * mulY;
    sumOfProducts += product;
  }
  match = regex.exec(input);
}
console.log(sumOfProducts);
