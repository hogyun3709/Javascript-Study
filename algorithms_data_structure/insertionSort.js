insertionSort = (array) => {
  for (outer = 1; outer < array.length; outer++) {
    for (inner = 0; inner < outer; inner++) {
      // if inner value is smaller, only outer and inner counter increase
      if (array[outer] < array[inner]) {
        //eject smaller(outer) value in tmp array
        const element = array.splice(outer, 1)
        //Following line: remove 0 element from index 0(inner), insert element at the index(inner)
        array.splice(inner, 0, ...element)
      }
    }
  }
  return array
}
const numbers = [8, 5, 6, 9, 3, 1, 4, 2, 7, 10]
insertionSort(numbers)
