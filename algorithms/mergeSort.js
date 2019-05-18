mergeSort = (array) => {
  if (array.length < 2) {
    return array
  }
  const mid = Math.floor(array.length / 2)
  console.log("Mid: " + mid);
  const arrayA = array.slice(0, mid)
  const arrayB = array.slice(mid)
  console.log("Array of A: " + arrayA);
  console.log("Array of B: " + arrayB);
  // recursively call mergeSort(arrayA)
  // mergeSort(arrayA) calls first, mergeSort(arrayB) calls next,
  return sort(mergeSort(arrayA), mergeSort(arrayB))
}

sort = (arrayA, arrayB) => {
  // console.log("Array of A: " + arrayA);
  // console.log("Array of B: " + arrayB);
  const sorted = []

  while (arrayA.length && arrayB.length) {
    if (arrayA[0] <= arrayB[0]) {
      sorted.push(arrayA.shift())
    } else {
      sorted.push(arrayB.shift())
    }
    console.log("Sorted: " + sorted);
  }
  const output = [
    ...sorted,
    ...arrayA,
    ...arrayB
  ]
  console.log("Output: " + output)
  return output
}

const numbers = [
  8,
  5,
  17,
  6,
  9,
  19,
  3,
  12,
  16,
  20,
  1,
  4,
  15,
  11,
  2,
  7,
  13,
  18,
  10,
  14,
]
console.log(mergeSort(numbers))
