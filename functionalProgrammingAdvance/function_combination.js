const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const _map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const _filter = curry((fns, iter) => {
  let res = [];
  for (const a of iter) {
    if (fns(a)) {
      res.push(a);
    }
  }
  return res;
});

const _reduce = curry((fns, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fns(acc, a);
  }
  return acc;
});

const _go = (...args) => _reduce((a, fns) => fns(a), args);

const _pipe = (f, ...fns) => (...args) => _go(f(...args), ...fns);

const add = (a, b) => a + b;

const products = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 }
];

const total_price = _pipe(_map(p => p.price), _reduce(add));

const base_total_price = predi => _pipe(filter(predi), total_price);

_go(products, _filter(p => p.price < 20000), total_price, console.log);

_go(products, _filter(p => p.price >= 20000), total_price, console.log);

_go(products, total_price(p => p.price >= 20000), console.log);

_go(products, total_price(p => p.price < 20000), console.log);
