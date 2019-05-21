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
  // while sort(mergeSort(arrayA)) executes, it creates new sub arrayA and arrayB data sets to sort the values
  return sort(mergeSort(arrayA), mergeSort(arrayB))
}

sort = (arrayA, arrayB) => {
  console.log("Values are ready: " +  "ArrayA: " + arrayA + "," + " arrayB: "+ arrayB);
  const sorted = []

  while (arrayA.length && arrayB.length) {
    if (arrayA[0] <= arrayB[0]) {
      sorted.push(arrayA.shift())
    } else {
      sorted.push(arrayB.shift())
    }
    console.log("Instant Sorted: " + sorted);
  }
  const output = [
    ...sorted,
    ...arrayA,
    ...arrayB
  ]
  console.log("Sorted: " + sorted);
  console.log("arrayA: " + arrayA);
  console.log("arrayB: " + arrayB);
  console.log("Sorted Output: " + output)

  return output
}

const numbers = [8, 5, 6, 9, 3, 1, 4, 2, 7, 10]

console.log(mergeSort(numbers));
