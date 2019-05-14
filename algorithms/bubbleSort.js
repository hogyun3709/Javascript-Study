bubbleSort = (array) => {
  let swapped = false
  do {
    swapped = false
    array.forEach((current, i) => {
      if (current > array[i + 1]) {
        const key = current
        console.log(array.join(' '))
        // this line enables swap the elements
        array[i] = array[i + 1]
        // console.log(array[i])
        array[i + 1] = key
        // console.log(array[i + 1])
        swapped = true
      }
    })
  } while(swapped)
  //this line shows the last sort result
  console.log(array.join(' '))
  return array
}

const numbers = [8, 5, 6, 9, 3, 1, 11, 4, 2, 7, 10]
bubbleSort(numbers)
