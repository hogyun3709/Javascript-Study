const min = 1;
const max = 20;

const generateRandNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const createArray = (el) => {
  let arr = [];
  for(let i = 0; i < el; i++){
    let randomNumber = generateRandNumber(max, min);
    arr.push(randomNumber);
    if (arr[i - 1] === arr[i]){
      arr.pop()
      i--
    }
    if (arr[i - 2] === arr[i]){
      arr.pop()
      i--
    }
  }
  return arr;
}

const randomNumberArray = () => {
  return createArray(3);
}

randomNumberArray();
