const linearSearch = (array, target) => {
  for (a of array){
    if(a === target) return true
  }
  return false
}

const array = [0,2,2,3,4,5]

console.log(linearSearch(array, 3));
console.log(linearSearch(array, 6));
