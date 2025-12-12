const input = require("fs");
const path = require("path");
const xyzBlob = input.readFileSync(path.join(__dirname, "Day-8-input.txt"), "utf-8").trim();

const lineSegments = xyzBlob.split("\n");


const junctMatrix = [];
for (let magneticNode of lineSegments) {
    const [xCoord, yCoord, zCoord] = magneticNode.split(",").map(Number);
    junctMatrix.push({ xCoord, yCoord, zCoord });
}

console.log(`Loaded ${junctMatrix.length} junction boxes`);

// ==================== Part 1 ====================


const distanceManifold = [];
for (let idx_a = 0; idx_a < junctMatrix.length; idx_a++) {
    for (let idx_b = idx_a + 1; idx_b < junctMatrix.length; idx_b++) {
        const deltaX = junctMatrix[idx_a].xCoord - junctMatrix[idx_b].xCoord;
        const deltaY = junctMatrix[idx_a].yCoord - junctMatrix[idx_b].yCoord;
        const deltaZ = junctMatrix[idx_a].zCoord - junctMatrix[idx_b].zCoord;
        const euclidDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
        distanceManifold.push({ idx_a, idx_b, euclidDist });
    }
}

console.log(`Calculated ${distanceManifold.length} pairwise distances`);


distanceManifold.sort((nodeA, nodeB) => nodeA.euclidDist - nodeB.euclidDist);


class DisjointSetUnion {
    constructor(numElements) {
        this.parentChain = Array.from({ length: numElements }, (_, i) => i);
        this.hierarchyRank = Array(numElements).fill(0);
    }

    findRoot(element) {
        if (this.parentChain[element] !== element) {
            this.parentChain[element] = this.findRoot(this.parentChain[element]);
        }
        return this.parentChain[element];
    }

    mergeSet(elemA, elemB) {
        const rootA = this.findRoot(elemA);
        const rootB = this.findRoot(elemB);

        if (rootA === rootB) return false;


        if (this.hierarchyRank[rootA] < this.hierarchyRank[rootB]) {
            this.parentChain[rootA] = rootB;
        } else if (this.hierarchyRank[rootA] > this.hierarchyRank[rootB]) {
            this.parentChain[rootB] = rootA;
        } else {
            this.parentChain[rootB] = rootA;
            this.hierarchyRank[rootA]++;
        }
        return true;
    }
}

const dsuEngine = new DisjointSetUnion(junctMatrix.length);


for (let iter = 0; iter < Math.min(1000, distanceManifold.length); iter++) {
    dsuEngine.mergeSet(distanceManifold[iter].idx_a, distanceManifold[iter].idx_b);
}

console.log(`Applied 1000 closest pair connections`);


const circuitMetrics = {};
for (let nodIdx = 0; nodIdx < junctMatrix.length; nodIdx++) {
    const rootNode = dsuEngine.findRoot(nodIdx);
    circuitMetrics[rootNode] = (circuitMetrics[rootNode] || 0) + 1;
}


const sizeVec = Object.values(circuitMetrics).sort((a, b) => b - a);
console.log(`Number of circuits: ${sizeVec.length}`);
console.log(`Circuit sizes (top 10): ${sizeVec.slice(0, 10).join(", ")}`);


const result = sizeVec[0] * sizeVec[1] * sizeVec[2];
console.log(`Part 1 Result: ${result}`);

/*============================= Part 2 =====================================*/


const dsuEngine2 = new DisjointSetUnion(junctMatrix.length);


let finalJunction = null;
let circuitCnt = junctMatrix.length; 

for (let edgeData of distanceManifold) {
    if (circuitCnt === 1) break; 

    if (dsuEngine2.mergeSet(edgeData.idx_a, edgeData.idx_b)) {

        circuitCnt--;
        finalJunction = edgeData;
    }
}

console.log(`\nPart 2: Last connection made between boxes ${finalJunction.idx_a} and ${finalJunction.idx_b}`);
console.log(`Box ${finalJunction.idx_a}: (${junctMatrix[finalJunction.idx_a].xCoord}, ${junctMatrix[finalJunction.idx_a].yCoord}, ${junctMatrix[finalJunction.idx_a].zCoord})`);
console.log(`Box ${finalJunction.idx_b}: (${junctMatrix[finalJunction.idx_b].xCoord}, ${junctMatrix[finalJunction.idx_b].yCoord}, ${junctMatrix[finalJunction.idx_b].zCoord})`);

const part2Result = junctMatrix[finalJunction.idx_a].xCoord * junctMatrix[finalJunction.idx_b].xCoord;
console.log(`Part 2 Result: ${part2Result}`);
