const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];

// iter = iterable protocal 를 따르는 인자

const _map = (f, iter) =>{
  let res = [];
  for (const a of iter){
    res.push(f(a));
  }
  return res;
}

let names = [];
for (const a of products) {
  names.push(a.name);
}
console.log(names);

console.log(
  _map(a => a.name, products)
);

let prices = [];
for (const a of products) {
  prices.push(a.price);
}
console.log(prices);

console.log(
  _map(a => a.price, products)
);
