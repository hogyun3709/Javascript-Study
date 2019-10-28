quickSort = (array) => {
  if (array.length < 2) {
    return array
  }
  const pivotIndex = array.length - 1
  const pivot = array[pivotIndex]
  const left = []
  const right = []
  for (let i = 0; i < pivotIndex; i++) {
    const temp = array[i]
    // console.log("temp: " + temp);
    temp < pivot ? left.push(temp) : right.push(temp)
  }
  //quickSort(left) excutes recursively
  const output = [...quickSort(left), pivot, ...quickSort(right)]
  // console.log("Output: " + output.join(' '))
  return output
}
const numbers = [8, 5, 6, 9, 3, 1, 4, 2, 7, 10]
quickSort(numbers)
