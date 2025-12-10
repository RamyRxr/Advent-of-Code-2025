const input = require("fs");
const pathe = require("path");
const data = input.readFileSync(pathe.join(__dirname, "Day-4-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));


/*============================= Part 1 =====================================*/