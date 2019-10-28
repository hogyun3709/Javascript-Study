/*
Modern version of Fisher-Yates shuffle - Apply JS ES6 feature with Durstenfeld method.
Fisher Yates method crates a new temp array inside of loop(memory loss), Durstenfeld just swap the indexes of elements
*/
const shuffleArrayFisherYates = (array) => {
  for (let i = array.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
  }
  return array
}
console.log(shuffleArrayFisherYates([0,1,2,3,4,5]));
const shuffleArrayDurstenfeld = (array) => {
  // If array.length, = undefined / index of array is lower than array length
  for (let i = array.length-1; i > 0; i--) {
    // i is max inclusive
    // from 0 incluse to max inclusive
    // Its not actually randomize, pop the target value and shift to end of the array
    const j = Math.floor(Math.random() * (i + 1));
    console.log("arrary index range: " + array[i]);
    console.log("target: "+ array[j]);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
console.log(shuffleArrayDurstenfeld([0,1,2,3,4,5]));


/* Javascript */

// Inclusive 0 btw exclusive max
console.log(Math.floor(Math.random() * max));
// Exclusive max btw inclusive min
console.log(Math.floor(Math.random() * (max - min)) + min);
// Inclusive max btw inclusve min
console.log(Math.floor(Math.random() * (max - min + 1)) + min);
