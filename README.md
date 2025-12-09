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
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

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

## Day 13
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 14
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

## Day 15
**Challenge Name:** 

**Concept:**

**Solution Explanation:**

**Code:**
```javascript

```

---

*Last Updated: December 6, 2025*
