const min = 1;
const max = 20;

const generateRandNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const createArray = (el) => {
  let arr = [];
  for (let i = 0; i < el; i++) {
    let randomNumber = generateRandNumber(max, min);
    arr.push(randomNumber);
    if (arr[i - 1] === arr[i]) {
      arr.pop()
      i--
    }
    if (arr[i - 2] === arr[i]) {
      arr.pop()
      i--
    }
  }
  return arr;
}
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randomNumberArray = () => {
  return createArray(3);
}

randomNumberArray();

const executePapyrus = (userInput) => {
  let firstTrial = randomNumberArray();
  console.log(firstTrial[0]);
  console.log(firstTrial[1]);
  console.log(firstTrial[2]);
  console.log("( " + firstTrial[0] + " + " + "?" + " )" + " X " + " ? ");
  console.log("( " + firstTrial[0] + " + " + firstTrial[1] + " )" + " X " + " ? ");
  console.log("( " + firstTrial[0] + " + " + firstTrial[1] + " )" + " X " + firstTrial[2]);
  if (userInput === 'yes') {
    shuffleArray(firstTrial);
    console.log("( " + firstTrial[0] + " + " + firstTrial[1] + " )" + " X " + firstTrial[2]);
  }
  return (firstTrial[0] + firstTrial[1]) * firstTrial[2]
}

executePapyrus()

// for further feature let user have once chance to switch the integers
