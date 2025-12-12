# 🎄 Advent of Code 2025

Solving 15 days of coding challenges with clean and efficient solutions.

---

## 📋 Challenge Template

For each day, I document:
- **Challenge Name** - The title of the challenge
- **Concept** - Main idea/problem to solve
- **Solution Explanation** - How I solved it
- **Code** - The working solution

---

## Day 1
**Challenge Name:** Secret Entrance - Dial Safe Lock

**Concept:**
A safe has a circular dial with numbers 0-99. You receive a sequence of rotations (L for left/lower numbers, R for right/higher numbers) with distances. The dial wraps around: going left from 0 reaches 99, going right from 99 reaches 0.

**Part 1:** Count how many times you END UP at position 0 after each rotation.
**Part 2:** Count EVERY time you land on or pass through position 0 (including during rotations).

**Solution Explanation:**
The key insight is understanding how the circular dial wraps. When moving, you may pass through position 0 multiple times before reaching your final position. 

**Approach 1 (Step-by-Step):** Move one click at a time and track each position. For every click, check if we land on 0. This is the most straightforward method.

**Approach 2 (Math.floor):** Calculate crossings mathematically:
- **Going LEFT:** If `newPos < 0`, crossings = `Math.floor((steps - currentPos) / 100)`
- **Going RIGHT:** If `newPos > 99`, crossings = `Math.floor(newPos / 100)`

Both approaches correctly handle the circular wrapping.

**Code:**
```javascript
// Step-by-step solution (most intuitive)
let counter_1 = 0, counter_2 = 0, rey = 50;

for (let i = 0; i < Codes.length; i++) {
    const { direction, steps } = parseCode(Codes[i]);
    
    for (let click = 0; click < steps; click++) {
        if (direction === 'L') {
            rey = rey > 0 ? rey - 1 : 99;
        } else {
            rey = rey < 99 ? rey + 1 : 0;
        }
        if (rey == 0) counter_2++;
    }
    
    if (rey == 0) counter_1++;
}
```

**Results:**
- **Part 1:** 282 (ended at 0 exactly 282 times)
- **Part 2:** 6907 (landed on 0 a total of 6907 times)

---

## Day 2
**Challenge Name:** Gift Shop - Invalid Product IDs

**Concept:**
An Elf accidentally added invalid product IDs to a database. An ID is invalid if it's a sequence of digits repeated at least once (or exactly twice for Part 1).

**Part 1:** A number is invalid if it's a sequence repeated exactly twice (e.g., 11, 6464, 123123).
**Part 2:** A number is invalid if it's a sequence repeated at least twice (e.g., 111, 1212, 123123123).

You're given ranges of IDs (e.g., 11-22, 95-115) and must find all invalid IDs within each range, then sum them.

**Solution Explanation:**
For **Part 1:** Split the number string in half and check if both halves are identical.
- `11`: "1" == "1" ✓ Invalid
- `1010`: "10" == "10" ✓ Invalid
- `55`: "5" == "5" ✓ Invalid

For **Part 2:** Try all possible sequence lengths from 1 to half the number's length. If the entire number is made of that sequence repeated at least 2 times, it's invalid.
- `111`: sequence "1" repeats 3 times ✓ Invalid
- `999`: sequence "9" repeats 3 times ✓ Invalid
- `12341234`: sequence "1234" repeats 2 times ✓ Invalid

**Code:**
```javascript
// Part 1: Exact duplicate
for (let j = start; j <= end; j++) {
    const jStr = j.toString();
    if (jStr.length % 2 === 0) {
        const half = jStr.length / 2;
        if (jStr.substring(0, half) === jStr.substring(half)) {
            results += j;
        }
    }
}

// Part 2: Repeated sequence (at least 2 times)
for (let j = start; j <= end; j++) {
    const jStr = j.toString();
    for (let seqLen = 1; seqLen <= jStr.length / 2; seqLen++) {
        if (jStr.length % seqLen === 0) {
            const firstChunk = jStr.substring(0, seqLen);
            let isRepeating = true;
            for (let pos = seqLen; pos < jStr.length; pos += seqLen) {
                if (jStr.substring(pos, pos + seqLen) !== firstChunk) {
                    isRepeating = false;
                    break;
                }
            }
            if (isRepeating) {
                results_2 += j;
                break;
            }
        }
    }
}
```

**Results:**
- **Part 1:** 11023097
- **Part 2:** 47039803

---

## Day 3
**Challenge Name:** Lobby - Emergency Power Batteries

**Concept:**
Batteries are arranged in banks (each line of digits). Each digit represents a battery with a joltage rating (1-9).

**Part 1:** Select exactly 2 batteries from each bank. The joltage is the number formed by those 2 digits in their original order. Find the maximum joltage possible for each bank.
- Example: `12345` with batteries 2 and 4 → `24` jolts
- `987654321111111` → `98` (first two batteries)
- `818181911112111` → `92` (9 and 2 from different positions)

**Part 2:** Select exactly 12 batteries from each bank to form the largest possible 12-digit number. Use a greedy stack approach to maximize the result.
- Example: `234234234234278` → `434234234278` (removed 2, 3, 2 from start)
- `818181911112111` → `888911112111` (kept the largest digits in order)

**Solution Explanation:**

For **Part 1:** Try all possible pairs of positions (j, k where j < k) and form a number from those digits. Track the maximum.

For **Part 2:** Use a **greedy stack algorithm**:
1. For each digit, maintain a stack
2. While we need to remove digits AND current digit is larger than stack top AND we have enough remaining digits, pop from stack
3. Push current digit
4. Remove from the end if needed, keep exactly 12

**Code:**
```javascript
// Part 1: Find maximum joltage from 2 batteries
let maxJoltage = 0;
for (let j = 0; j < bank.length; j++) {
    for (let k = j + 1; k < bank.length; k++) {
        const joltage = parseInt(bank[j] + bank[k], 10);
        if (joltage > maxJoltage) {
            maxJoltage = joltage;
        }
    }
}

// Part 2: Greedy stack for maximum 12-digit number
const targetLength = 12;
let stack = [];
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

const joltageStr = stack.slice(0, targetLength).join("");
```

**Results:**
- **Part 1:** 5568503
- **Part 2:** 10947209109

---

## Day 4
**Challenge Name:** Printing Department - Paper Roll Accessibility

**Concept:**
Paper rolls (@) are arranged on a large grid. A forklift can access a roll if it has **fewer than 4 paper rolls** as neighbors in the 8 adjacent positions (up, down, left, right, and 4 diagonals).

**Part 1:** Count how many rolls can be accessed by a forklift.
**Part 2:** Repeatedly remove accessible rolls (once removed, other rolls become accessible). Count the total number of rolls removed until none can be removed.

**Solution Explanation:**

For **Part 1:** Iterate through the grid. For each `@`, count its neighbors (using all 8 directions). If the count is less than 4, it's accessible. Sum all accessible rolls.

For **Part 2:** Use a loop that repeatedly finds and removes all accessible rolls. Each iteration:
1. Find all rolls with fewer than 4 neighbors
2. Remove them from the grid
3. Increment the total removed counter
4. Repeat until no more rolls can be removed

The key insight is that removing rolls changes the neighbor count of remaining rolls, potentially making new ones accessible.

**Code:**
```javascript
// Part 1: Count accessible rolls
let accessible = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '@') {
            let neighborCount = 0;
            
            for (let dRow = -1; dRow <= 1; dRow++) {
                for (let dCol = -1; dCol <= 1; dCol++) {
                    if (dRow === 0 && dCol === 0) continue;
                    
                    let newRow = row + dRow;
                    let newCol = col + dCol;
                    
                    if (newRow >= 0 && newRow < grid.length && 
                        newCol >= 0 && newCol < grid[newRow].length) {
                        if (grid[newRow][newCol] === '@') {
                            neighborCount++;
                        }
                    }
                }
            }
            
            if (neighborCount < 4) {
                accessible++;
            }
        }
    }
}

// Part 2: Repeatedly remove accessible rolls
let totalRemoved = 0;
let canRemove = true;

while (canRemove) {
    canRemove = false;
    let toRemove = [];
    
    // Find all accessible rolls
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '@') {
                let neighborCount = 0;
                
                for (let dRow = -1; dRow <= 1; dRow++) {
                    for (let dCol = -1; dCol <= 1; dCol++) {
                        if (dRow === 0 && dCol === 0) continue;
                        
                        let newRow = row + dRow;
                        let newCol = col + dCol;
                        
                        if (newRow >= 0 && newRow < grid.length && 
                            newCol >= 0 && newCol < grid[newRow].length) {
                            if (grid[newRow][newCol] === '@') {
                                neighborCount++;
                            }
                        }
                    }
                }
                
                if (neighborCount < 4) {
                    toRemove.push({row, col});
                    canRemove = true;
                }
            }
        }
    }
    
    // Remove them
    for (let {row, col} of toRemove) {
        grid[row][col] = '.';
        totalRemoved++;
    }
}
```

**Results:**
- **Part 1:** (Run code to get result)
- **Part 2:** (Run code to get result)

---

## Day 6
**Challenge Name:** Trash Compactor - Cephalopod Math

**Concept:**
A math worksheet has problems arranged horizontally in columns. Numbers are arranged vertically, with an operation symbol (+/-) at the bottom. Problems are separated by columns of spaces.

**Part 1:** Read problems left-to-right. Each space-separated number is extracted left-to-right from each row, then apply the operation to calculate the result. Sum all problem results.
**Part 2:** Read problems right-to-left. Each **column** (reading top-to-bottom) forms ONE number. Process columns from right-to-left within each problem, then apply the operation. Sum all problem results.

**Solution Explanation:**

For **Part 1:** Parse horizontally - extract space-separated numbers from each row within a problem range.

For **Part 2:** Parse vertically - for each column from right-to-left:
1. Read the column top-to-bottom to form the number
2. Collect all numbers
3. Apply the operation to get the result

**Code:**
```javascript
// Part 1: Space-separated numbers left-to-right
for (let row = 0; row < lines.length - 1; row++) {
    const problemLine = lines[row].substring(prob.start, prob.end);
    const tokens = problemLine.split(/\s+/).filter(t => t.length > 0);
    for (let token of tokens) {
        if (!isNaN(token)) {
            numbers.push(parseInt(token));
        }
    }
}

// Part 2: Each column top-to-bottom, process right-to-left
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
    if (numStr) {
        numbers.push(parseInt(numStr));
    }
}
```

**Results:**
- **Part 1:** 4648618073226
- **Part 2:** 7329921182115

---

## Day 5
**Challenge Name:** Cafeteria - Fresh Ingredient ID Database

**Concept:**
You have a database with two sections: fresh ingredient ID ranges and a list of available ingredient IDs. A range like `3-5` means IDs 3, 4, and 5 are fresh. Ranges can overlap.

**Part 1:** Given available ingredient IDs, count how many fall within at least one fresh range.
**Part 2:** Ignore the available IDs list. Instead, find all unique IDs that the fresh ranges cover (accounting for overlaps). Count the total.

**Solution Explanation:**

For **Part 1:** Check each available ingredient ID against all ranges. If it falls in ANY range, count it as fresh.
- Example: ID 5 is fresh if it's in range 3-5, even if not in other ranges
- ID 32 is NOT fresh if it's outside all ranges

For **Part 2:** Merge all overlapping ranges, then count total unique IDs:
1. Sort ranges by start position
2. Merge overlapping/adjacent ranges (e.g., 3-5 and 5-10 → 3-10)
3. Sum the counts: for each merged range, add (end - start + 1)

**Code:**
```javascript
// Part 1: Check each ingredient against all ranges
let freshCount = 0;
for (let id of ingredients) {
    let isFresh = false;
    for (let range of ranges) {
        if (id >= range.start && id <= range.end) {
            isFresh = true;
            break;
        }
    }
    if (isFresh) freshCount++;
}

// Part 2: Merge overlapping ranges and count unique IDs
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
```

**Results:**
- **Part 1:** 694
- **Part 2:** 352716206375547

---

## Day 6
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 7
**Challenge Name:** Laboratories - Tachyon Manifold Beam Splitting

**Concept:**
A tachyon beam enters a manifold at position S and moves downward. When the beam hits a splitter (`^`), it splits into two beams going left and right. We need to count:
- **Part 1:** How many times the beam splits
- **Part 2:** How many different timelines (distinct paths) the tachyon particle can take through the manifold

**Part 1 Explanation:**
Use BFS (breadth-first search) to simulate the beam propagation:
1. Start from the row below S
2. Track visited states as "row,col" to avoid infinite loops
3. For each position:
   - If it's a splitter (`^`): increment split count and add both left and right next positions to queue
   - Otherwise: continue downward
4. Stop when the beam exits the grid

**Part 2 Explanation:**
Use recursive DFS with memoization to count all possible paths:
1. From any position (row, col), calculate how many distinct timelines reach an exit
2. **Base case:** If at the last row, that's 1 timeline
3. **If out of bounds:** 0 timelines
4. **If splitter:** Sum timelines from left path + timelines from right path (quantum splitting)
5. **Otherwise:** Timelines = count from moving downward
6. Memoize results for each (row, col) to avoid recomputation

The key insight for Part 2 is that each splitter creates a bifurcation in timelines, causing exponential growth. We count all distinct paths, which grows very large due to the many possible combinations of left/right choices at each splitter.

**Code:**
```javascript
// Part 1: BFS counting splits
let splitCount = 0;
const queue = [[1, startCol]];
const visited = new Set();

while (queue.length > 0) {
    const [row, col] = queue.shift();
    
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
        continue;
    }
    
    const state = row + "," + col;
    if (visited.has(state)) continue;
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

// Part 2: Recursive DFS with memoization counting paths
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
```

**Results:**
- **Part 1:** 1570 (beam splits 1570 times)
- **Part 2:** 15118009521693 (15 trillion+ distinct timelines)

---

## Day 8
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 9
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 10
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 11
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 12
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

*Last Updated: December 12, 2025*
