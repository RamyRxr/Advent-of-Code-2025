const input = require("fs");
const path = require("path");
const data = input.readFileSync(path.join(__dirname, "Day-7-input.txt"), "utf-8").trim();

const grid = data.split("\n");
console.log("Grid loaded: " + grid.length + " rows, " + grid[0].length + " columns");

// Find starting position S
let startCol = -1;
for (let col = 0; col < grid[0].length; col++) {
    if (grid[0][col] === 'S') {
        startCol = col;
        break;
    }
}
console.log("Start position: column " + startCol);

/*============================= Part 1 =====================================*/

let splitCount = 0;
const queue = [[1, startCol]];
const visited = new Set();

while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
        continue;
    }

    const state = row + "," + col;
    if (visited.has(state)) {
        continue;
    }
    visited.add(state);

    const cell = grid[row][col];

    if (cell === '^') {

        splitCount++;

        queue.push([row + 1, col - 1]);

        queue.push([row + 1, col + 1]);
    } else if (cell === '.' || cell === 'S') {

        queue.push([row + 1, col]);
    }
}

console.log("Part 1 Result: " + splitCount);


/*============================= Part 2 =====================================*/


const memo2 = {};

function countTimelines(row, col) {

    if (row >= grid.length || col < 0 || col >= grid[row].length) {
        return 0;
    }

    if (row === grid.length - 1) {
        return 1;
    }

    const key = row + "," + col;
    if (memo2[key] !== undefined) {
        return memo2[key];
    }

    let count = 0;
    const cell = grid[row][col];

    if (cell === '^') {

        count = countTimelines(row + 1, col - 1) + countTimelines(row + 1, col + 1);
    
    } else {

        count = countTimelines(row + 1, col);

    }

    memo2[key] = count;
    return count;
}

const part2Result = countTimelines(1, startCol);
console.log("Part 2 Result: " + part2Result);