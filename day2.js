const fs = require("fs");
const input = fs.readFileSync("./resources/day2_input.txt", "utf-8");

let data = [];

//load array
input.split("\n").forEach((line) => {
  if (line) {
    const row = line.split(" ").map((token) => parseInt(token, 10));
    data.push(row);
  }
});

console.log(data);

// rule 1
