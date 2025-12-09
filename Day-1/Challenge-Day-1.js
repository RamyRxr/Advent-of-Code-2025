const input = require("fs");
const path = require("path");
const data = input.readFileSync(path.join(__dirname, "Day-1-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));


const Codes = data.match(/[LR]\d+/g);
console.log(Codes);

/*============================ Part One & Two - Step by Step =========================*/

let counter_1 = 0;
let counter_2 = 0;
let rey = 50;

for (let i = 0; i < Codes.length; i++) {
    const code = Codes[i];
    const direction = code.charAt(0);
    const steps = parseInt(code.slice(1), 10);

    for (let click = 0; click < steps; click++) {
        if (direction === 'L') {
            rey--;
            if (rey < 0) {
                rey = 99;  // Wrap around
            }
        } else if (direction === 'R') {
            rey++;
            if (rey > 99) {
                rey = 0;  // Wrap around
            }
        }

        // Check if we landed on 0
        if (rey == 0) {
            counter_2++;
        }
    }

    // Part 1: Count only if we END the rotation at 0
    if (rey == 0) {
        counter_1++;
    }
}

console.log("Final position: " + rey);
console.log("Number of times ended at position 0 (Part 1): " + counter_1);
console.log("Number of times landed on position 0 (Part 2): " + counter_2);



