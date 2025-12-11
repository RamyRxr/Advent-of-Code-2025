const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "Day-6-input.txt"), "utf-8");

const lines = data.split("\n").filter(line => line.length > 0);

console.log("Total lines: " + lines.length);
console.log("First line length: " + lines[0].length);

const maxLen = Math.max(...lines.map(l => l.length));
const separatorCols = [];

for (let col = 0; col < maxLen; col++) {
    let isEmpty = true;
    for (let row = 0; row < lines.length; row++) {
        if (col < lines[row].length && lines[row][col] !== ' ') {
            isEmpty = false;
            break;
        }
    }
    if (isEmpty) {
        separatorCols.push(col);
    }
}

const problemRanges = [];
let start = 0;
let i = 0;

while (i < maxLen) {

    while (i < maxLen && separatorCols.includes(i)) {
        i++;
    }

    if (i < maxLen) {
        start = i;

        while (i < maxLen && !separatorCols.includes(i)) {
            i++;
        }
        problemRanges.push({ start, end: i });
    }
}

console.log("Problems found: " + problemRanges.length);

/*============================= Part 1 =====================================*/

let grandTotal = 0;

for (let prob of problemRanges) {
    const operationLine = lines[lines.length - 1];
    let operation = null;
    let numbers = [];

    for (let col = prob.start; col < prob.end; col++) {
        if (col < operationLine.length) {
            const char = operationLine[col];
            if (char === '+' || char === '*') {
                operation = char;
                break;
            }
        }
    }

    for (let row = 0; row < lines.length - 1; row++) {
        const problemLine = lines[row].substring(prob.start, prob.end);
        const tokens = problemLine.split(/\s+/).filter(t => t.length > 0);
        for (let token of tokens) {
            if (!isNaN(token)) {
                numbers.push(parseInt(token));
            }
        }
    }

    let result = numbers[0];
    if (operation === '+') {
        for (let i = 1; i < numbers.length; i++) {
            result += numbers[i];
        }
    } else if (operation === '*') {
        for (let i = 1; i < numbers.length; i++) {
            result *= numbers[i];
        }
    }

    console.log("Problem: " + numbers.join(operation) + " = " + result);
    grandTotal += result;
}

console.log("Part 1 Result: " + grandTotal);


/*============================= Part 2 =====================================*/

let grandTotal2 = 0;

for (let prob of problemRanges) {
    const operationLine = lines[lines.length - 1];
    let operation = null;
    let numbers = [];

    for (let col = prob.start; col < prob.end; col++) {
        if (col < operationLine.length) {
            const char = operationLine[col];
            if (char === '+' || char === '*') {
                operation = char;
                break;
            }
        }
    }

    for (let col = prob.end - 1; col >= prob.start; col--) {
        let numStr = "";

        for (let row = 0; row < lines.length - 1; row++) {
            if (col < lines[row].length) {
                const char = lines[row][col];
                if (char >= '0' && char <= '9') {
                    numStr += char;
                }
            }
        }

        // If this column has digits, add it as a number
        if (numStr) {
            numbers.push(parseInt(numStr));
        }
    }

    let result = numbers[0];
    if (operation === '+') {
        for (let i = 1; i < numbers.length; i++) {
            result += numbers[i];
        }
    } else if (operation === '*') {
        for (let i = 1; i < numbers.length; i++) {
            result *= numbers[i];
        }
    }

    console.log("Problem Part 2: " + numbers.join(operation) + " = " + result);
    grandTotal2 += result;
}

console.log("Part 2 Result: " + grandTotal2);