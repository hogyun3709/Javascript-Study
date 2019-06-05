const min = 1;
const max = 20;

const randomNumber= (max, min) => {
  return Math.floor(Math.random() * (max - min) + min)
}
console.log(randomNumber(max, min));


function randomFirst(){
  return new Promise(resolve => setTimeout(() => 
    resolve(randomNumber(max, min)), 1000))
}

function randomSecond(){
  return new Promise(resolve => setTimeout(() =>
    resolve(randomNumber(max, min)), 5000))
}

function randomThrid(){
  return new Promise(resolve => setTimeout(() =>
    resolve(randomNumber(max, min)), 10000))
}

randomFirst().then(console.log);
randomSecond().then(console.log);
randomThrid().then(console.log);
