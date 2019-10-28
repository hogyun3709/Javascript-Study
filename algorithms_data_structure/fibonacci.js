/* F(n) = F(n - 1) + F(n - 2)*/

const fibonacciIter = (target) => {
  let currentNumber = 1, previousNumber = 0, temp;

  /**/
  while (target > 0){
    console.log(`${target}번의 loop가 남았습니다`);
    temp = currentNumber;
    console.log(`${currentNumber}를 이전 값인 ${previousNumber}와 더할 예정입니다.`);
    currentNumber = currentNumber + previousNumber;
    console.log(`이 ${currentNumber} 값이 더하고난 값입니다.`);
    previousNumber = temp;
    target--;
  }
  return currentNumber;
}

console.log(fibonacciIter(6));


const fibonacciRecur = (target) => {
  if (target < 2) return 1;
  return fibonacciRecur(target -1) + fibonacciRecur(target -2)
}

console.log(fibonacciRecur(6));
