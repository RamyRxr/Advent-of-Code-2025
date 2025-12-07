const input = require("fs");
const data = input.readFileSync("Day-1-input.txt", "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));


const Codes = data.match(/[LR]\d+/g);
console.log(Codes);

/*============================ Part One =========================*/ 

let counter = 0;
let rey = 50;

for (let i = 0; i < Codes.length; i++) {
    const code = Codes[i];
    const direction = code.charAt(0);
    const steps = parseInt(code.slice(1), 10);

    if (direction === 'L') {
        rey = rey - steps;
        while (rey < 0) {
            rey = rey + 100;
        }

        if (rey == 0) {
            counter ++;
        }

    } else if (direction === 'R') {
        rey = rey + steps;
        while (rey > 99) {
            rey = rey - 100;
        }
        if (rey == 0) {
            counter ++;
        }
    }

}

console.log("Final position: " + rey);
console.log("Number of times at position 0: " + counter);