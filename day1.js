const fs = require("fs");
const input = fs.readFileSync("./resources/day1_input.txt", "utf-8");

const left_list = [];
const right_list = [];

input.split("\n").forEach((line) => {
  if (line) {
    const [left, right] = line.trim().split(/\s+/);

    left_list.push(parseInt(left));
    right_list.push(parseInt(right));
  }
});

left_list.sort((a, b) => a - b);
console.log(left_list);
right_list.sort((a, b) => a - b);
console.log(right_list);

let sum_of_difference = 0;

for (let i = 0; i < left_list.length; i++) {
  sum_of_difference += Math.abs(left_list[i] - right_list[i]);
}
console.log(sum_of_difference);

let sum_of_similarity = 0;

for (let i = 0; i < left_list.length; i++) {
  const target = left_list[i];
  const occurrences = right_list.filter((num) => num === target).length;
  sum_of_similarity += target * occurrences;
}
console.log(sum_of_similarity);
