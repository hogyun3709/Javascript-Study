const _map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const _filter = (fns, iter) => {
  let res = [];
  for (const a of iter) {
    if (fns(a)) {
      res.push(a);
    }
  }
  return res;
};

const _reduce = (fns, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fns(acc, a);
  }
  return acc;
};

const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];

// 가격만 뽑는 map

console.log(_map(p => p.price, products));

// 특정 가격 이하의 상품만 뽑는

console.log(_map(p => p.price, _filter(p => p.price < 20000, products)));

// 특정 가격의 이하의 상품을 합한 가격

const add = (a, b) => a + b;
console.log(
  _reduce(
    add,
    _map(p => p.price,
      _filter(p => p.price < 20000, products)
    )
  )
);

console.log(
  _reduce(
    add,
    _filter(n => n < 20000,
      _map(p => p.price, products)
    )
  )
);
