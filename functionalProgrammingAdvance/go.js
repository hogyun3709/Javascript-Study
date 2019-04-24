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

const add = (a, b) => a + b;

console.log(
  _reduce(add, _map(p => p.price, _filter(p => p.price < 20000, products)))
);

// 코드를 값으로 다루어 표현력을 높혀보자

const _go = (...args) => _reduce((a, fns) => fns(a), args);

_go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100
);
