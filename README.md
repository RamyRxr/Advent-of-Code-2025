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
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 5
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

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
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

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

*Last Updated: December 6, 2025*
