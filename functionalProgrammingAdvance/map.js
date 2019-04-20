const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];

// iter = iterable protocal 를 따르는 인자

const _map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

let names = [];
for (const a of products) {
  names.push(a.name);
}
console.log(names);

console.log(_map(a => a.name, products));

// 3 methods to get prices

let prices = [];
for (const a of products) {
  prices.push(a.price);
}
console.log(prices);

console.log(_map(a => a.price, products));

console.log(products.map(a => a.price));

// mapp's polymorphism based on iterable protocol

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

console.log(_map(a => a * a, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 20);;

console.log(new Map(_map(([keys, values]) => [keys, values * 2], m)));

// return
// Map(2) { "a" => 20, "b" => 40}
