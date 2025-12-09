const input = require("fs");
const path = require("path");
const data = input.readFileSync(path.join(__dirname, "Day-2-input.txt"), "utf-8").trim();

console.log("Data loaded successfully." + data.length + " characters.");
console.log("First 100 characters: " + data.slice(0, 100));

const IDs = data.split(",").map(x => x.trim());
console.log(IDs);

/*============================= Part 1 =====================================*/ 

let results = 0;
let state = true;

for (let i = 0; i < IDs.length; i++) {
    let rey = IDs[i].split("-");
    const start = parseInt(rey[0], 10);
    const end = parseInt(rey[1], 10);

    for (let j = start; j <= end; j++) {
        const jStr = j.toString();
        let key = jStr.length / 2;
        state = true;

        for (let k = 0; k < key; k++) {
            if (jStr[k] !== jStr[key + k]) {
                state = false;
            }
        }
        if (state === true) {
            results = results + j;
        }
    }
}

console.log("Part 1 Result: " + results);

/*============================ Part Two =========================*/

let results_2 = 0;

for (let i = 0; i < IDs.length; i++) {
    let rey = IDs[i].split("-");
    const start = parseInt(rey[0], 10);
    const end = parseInt(rey[1], 10);
    
    for (let j = start; j <= end; j++) {
        const jStr = j.toString();
        let isInvalid = false;
        
        for (let seqLen = 1; seqLen <= jStr.length / 2; seqLen++) {
            let repeats = 0;
            let isRepeating = true;
            
            for (let pos = 0; pos < jStr.length; pos += seqLen) {
                const chunk = jStr.substring(pos, pos + seqLen);
                const firstChunk = jStr.substring(0, seqLen);
                
                if (chunk !== firstChunk) {
                    isRepeating = false;
                    break;
                }
                repeats++;
            }
            
            if (isRepeating && repeats >= 2 && jStr.length % seqLen === 0) {
                isInvalid = true;
                break;
            }
        }
        
        if (isInvalid) {
            results_2 = results_2 + j;
        }
    }
}

console.log("Part 2 Result: " + results_2);

