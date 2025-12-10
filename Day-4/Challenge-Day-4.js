const input = require("fs");
const pathe = require("path");
const data = input.readFileSync(pathe.join(__dirname, "Day-4-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));


/*============================= Part 1 =====================================*/

const Lines = data.split("\n");
let rey = 0;

for (let row = 0; row < Lines.length; row++) {
    for (let col = 0; col < Lines[row].length; col++) {
        if (Lines[row][col] === '@') {
            let neighbor = 0;

            for (let PRow = -1; PRow <= 1; PRow++) {
                for (let PCol = -1; PCol <= 1; PCol++) {
                    if (PRow === 0 && PCol === 0) continue;

                    let newRow = row + PRow;
                    let newCol = col + PCol;

                    if (newRow >= 0 && newRow < Lines.length &&
                        newCol >= 0 && newCol < Lines[newRow].length) {
                        if (Lines[newRow][newCol] === '@') {
                            neighbor++;
                        }
                    }
                }
            }

            if (neighbor < 4) {
                rey++;
            }
        }
    }
}

console.log("Part 1 Result: " + rey);


/*============================= Part 2 =====================================*/

let grid = Lines.map(row => row.split(""));
let totalRemoved = 0;

let canRemove = true;

while (canRemove) {
    canRemove = false;
    let toRemove = [];

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '@') {
                let neighbor = 0;

                for (let PRow = -1; PRow <= 1; PRow++) {
                    for (let PCol = -1; PCol <= 1; PCol++) {
                        if (PRow === 0 && PCol === 0) continue;

                        let newRow = row + PRow;
                        let newCol = col + PCol;

                        if (newRow >= 0 && newRow < grid.length &&
                            newCol >= 0 && newCol < grid[newRow].length) {
                            if (grid[newRow][newCol] === '@') {
                                neighbor++;
                            }
                        }
                    }
                }

                if (neighbor < 4) {
                    toRemove.push({ row, col });
                    canRemove = true;
                }
            }
        }
    }

    for (let { row, col } of toRemove) {
        grid[row][col] = '.';
        totalRemoved++;
    }
}

console.log("Part 2 Result: " + totalRemoved);


