const fs = require("fs");
const input = fs.readFileSync("./resources/day5_input.txt", "utf-8");

const [rulesInput, instructionsInput] = input.split("\n\n");
const rules = rulesInput.split("\n").map((rule) => {
  const [a, b] = rule.split("|");
  return { before: +a, after: +b };
});

const instructions = instructionsInput.split("\n").map((page) => {
  return page.split(",").map(Number);
});

function isValid(instruction, rules) {
  return rules.every(({ before, after }) => {
    const a = instruction.indexOf(before);
    const b = instruction.indexOf(after);
    return a == -1 || b == -1 || a <= b;
  });
}

function applyRules(instruction, rules) {
  return instruction.toSorted((a, b) =>
    rules.some(({ before: x, after: y }) => a == x && y == b) ? -1 : 0
  );
}

// Part One
console.log(
  instructions
    .filter((instruction) => isValid(instruction, rules))
    .map((instruction) => instruction[Math.floor(instruction.length / 2)])
    .reduce((partialSum, a) => partialSum + a, 0)
);

// Part Two
console.log(
  instructions
    .filter((instruction) => !isValid(instruction, rules))
    .map((instruction) => applyRules(instruction, rules))
    .map((instruction) => instruction[Math.floor(instruction.length / 2)])
    .reduce((partialSum, a) => partialSum + a, 0)
);
