const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];


// Imperative programming;
const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total = total + n;
}

console.log(total);

// functional programming

const _reduce = (fns, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter){
    acc = fns(acc, a);
  }
  return acc
};

console.log(
  _reduce(
    (total_price, product) => total_price + product.price,
    0,
     products)
);

console.log(
  _reduce(
    function(total_price, product){ return total_price + product.price },
    0,
    products,
  )
);

console.log(
  [0,1,2,3].reduce((acc, cv) => acc + cv, 0)
);
console.log(
  [0,1,2,3].reduce((acc, cv) => acc + cv)
);

const reducer = (acc, currValue) => acc + currValue;

console.log(
  [0,1,2,3].reduce(reducer)
);
