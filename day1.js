const fs = require("fs");
const input = fs.readFileSync("./resources/day1_input.txt", "utf-8");

const leftList = [];
const rightList = [];
let sumOfDifference = 0;
let sumOfSimilarity = 0;

input.split("\n").forEach((line) => {
  if (line) {
    const [left, right] = line.trim().split(/\s+/);

    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }
});

leftList.sort((a, b) => a - b);
console.log(leftList);
rightList.sort((a, b) => a - b);
console.log(rightList);

for (let i = 0; i < leftList.length; i++) {
  sumOfDifference += Math.abs(leftList[i] - rightList[i]);
  const target = leftList[i];
  const occurrences = rightList.filter((num) => num === target).length;
  sumOfSimilarity += target * occurrences;
}
console.log(sumOfDifference);
console.log(sumOfSimilarity);
