const input = require("fs");
const pathe = require("path");
const data = input.readFileSync(pathe.join(__dirname, "Day-5-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");

const lines = data.split("\n");
const blankLineIndex = lines.findIndex(line => line.trim() === "");
console.log("Blank line found at index: " + blankLineIndex);

const rangesData = lines.slice(0, blankLineIndex).join("\n");
const ingredientData = lines.slice(blankLineIndex + 1).join("\n");

const ranges = [];
rangesData.split("\n").forEach(line => {
    if (line.trim()) {
        const [start, end] = line.split("-").map(Number);
        ranges.push({ start, end });
    }
});

const ingredients = ingredientData.split("\n").filter(line => line.trim()).map(Number);

console.log("Ranges: " + ranges.length);
console.log("Ingredients: " + ingredients.length);

/*============================= Part 1 =====================================*/

let freshCount = 0;

for (let id of ingredients) {
    let isFresh = false;

    for (let range of ranges) {
        if (id >= range.start && id <= range.end) {
            isFresh = true;
            break;
        }
    }

    if (isFresh) {
        freshCount++;
    }
}

console.log("Part 1 Result: " + freshCount);

/*============================= Part 2 =====================================*/

ranges.sort((a, b) => a.start - b.start);

const mergedRanges = [];
for (let range of ranges) {
    if (mergedRanges.length === 0) {
        mergedRanges.push(range);
    } else {
        const lastRange = mergedRanges[mergedRanges.length - 1];
        if (range.start <= lastRange.end + 1) {

            lastRange.end = Math.max(lastRange.end, range.end);
        } else {

            mergedRanges.push(range);
        }
    }
}

let totalFreshIds = 0;
for (let range of mergedRanges) {
    totalFreshIds += (range.end - range.start + 1);
}

console.log("Part 2 Result: " + totalFreshIds);