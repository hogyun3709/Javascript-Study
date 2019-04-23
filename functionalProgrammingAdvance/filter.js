const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];

// imperative programming

let under20000 = [];
for (const a of products) {
  if (a.price < 20000) {
    under20000.push(a);
  }
}
console.log(...under20000);

let over20000 = [];
for (const a of products) {
  if (a.price > 20000) {
    over20000.push(a);
  }
}
console.log(...over20000);

// functional programming

const _filter = (fns, iter) => {
  let res = [];
  for (const a of iter) {
    if (fns(a)) {
      res.push(a);
    }
  }
  return res;
};

console.log(..._filter(a => a.price < 20000, products));
console.log(..._filter(a => a.price > 20000, products));

const _under20000 = _filter( a => a.price < 20000, products);
const _over20000 = _filter( a => a.price > 20000, products);

console.log(..._under20000);
console.log(..._over20000);

// Examples

console.log(_filter( values => values % 2, [1,2,3,4,5]));

console.log(_filter( values => values % 2, function *(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
} ()));
