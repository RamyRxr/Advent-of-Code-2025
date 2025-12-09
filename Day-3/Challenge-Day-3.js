const input = require("fs");
const pathe = require("path");
const data = input.readFileSync(pathe.join(__dirname, "Day-3-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));



/*============================= Part 1 =====================================*/

const rows = data.split("\n").map(x => x.trim());

let results = 0;

for (let i = 0; i < rows.length; i++) {
    const bank = rows[i];
    let max = 0;

    for (let j = 0; j < bank.length; j++) {
        for (let k = j + 1; k < bank.length; k++) {
            // Form a number from digits at positions j and k
            const digit1 = bank[j];
            const digit2 = bank[k];
            const rey = parseInt(digit1 + digit2, 10);

            if (rey > max) {
                max = rey;
            }
        }
    }

    results += max;
}

console.log("Part 1 Result: " + results);

/*============================= Part 2 =====================================*/
let results_2 = 0;

for (let i = 0; i < rows.length; i++) {
    const bank = rows[i];
    const targetLength = 12; 
    let toRemove = bank.length - targetLength;  

    for (let j = 0; j < bank.length; j++) {
        const digit = bank[j];

        while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < digit &&
            (bank.length - j) >= (targetLength - stack.length + 1)) {
            stack.pop();
            toRemove--;
        }

        stack.push(digit);
    }

    while (toRemove > 0) {
        stack.pop();
        toRemove--;
    }

    stack = stack.slice(0, targetLength);

    const joltageStr = stack.join("");
    const joltage = parseInt(joltageStr, 10);
    results_2 += joltage;
}

console.log("Part 2 Result: " + results_2);