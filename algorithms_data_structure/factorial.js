const factorial = (number) => {
  let result = 1;
  for (let i = 2; i <= number; i += 1) {
    console.log(i);
    result *= i;
    console.log("result: "+result);

  }
  return result;
}

const factorialRecur = (number) => {
  return number > 1 ? number * factorialRecur(number - 1) : 1;
}

console.log(factorial(4));
console.log(factorialRecur(0));
