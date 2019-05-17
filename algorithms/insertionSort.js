insertionSort = (array) => {
  for (outer = 1; outer < array.length; outer++) {
    for (inner = 0; inner < outer; inner++) {
      console.log(array.join(' '))
      // if inner value is smaller, only outer and inner counter increase
      if (array[outer] < array[inner]) {
        //eject smaller(outer) value in tmp array
        const [element] = array.splice(outer, 1)
        console.log("Element: " + element);
        //outer and inner are index of array
        console.log("Outer: " + outer);
        console.log("Inner: " + inner);
        //Following line: remove 0 element from index 0(inner), insert element at the index(inner)
        array.splice(inner, 0, element)

      }
    }
  }
  console.log(array.join(' '))
  return array
}
const numbers = [8, 5, 6, 9, 3, 1, 4, 2, 7, 10]
insertionSort(numbers)
