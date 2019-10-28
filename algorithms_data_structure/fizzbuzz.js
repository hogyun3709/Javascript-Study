// Straight-forward implementation

function fizzBuzz(num) {
  for (var i = 1; i <= num; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}
fizzBuzz(20);

// Logical and Conditional-ternary operator implementation with truthy value
function fizzBuzz2(num) {
  for (var i = 1; i <= num; i++) {
    // if given value's remainder = 0, in javascript 0 means false, Fizz will be returned
    // if given values' remainder != 0, in javascript not equal to 0 means true, the value retrun "", which means also false, but in this case, the logical operator takes in place in this function, expr1 || expr2, expr2 will be returned which is i.
    console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
  }
}

fizzBuzz2(20)
