console.log("Array");
const arr = [1, 2, 3];
for (const a of arr) console.log(a);
//for loop executes under the iterable protocol
console.log("Array starts at 2");
const arr1 = [1, 2, 3];
let iter1 = arr1[Symbol.iterator]();
iter1.next();
// for loop excutes after iterator initiated
for (const a of iter1) console.log(a);
console.log("Set");
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
console.log("Map");
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const a of map) console.log(a);
for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);
for (const a of map.entries()) console.log(a);
