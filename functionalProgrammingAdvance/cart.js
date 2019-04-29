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

const products = [
  { name: "short-sleeve-t-shirt", price: 15000, quantity: 1 },
  { name: "long-sleeve-t-shirt", price: 20000, quantity: 2 },
  { name: "phone-case", price: 15000, quantity: 3 },
  { name: "hoodie", price: 30000, quantity: 4 },
  { name: "pants", price: 25000, quantity: 5 }
];

const add = (a, b) => a + b;

const sum = (f, iter) => _go(iter, _map(f), _reduce(add));

console.log(sum(a => a.quantity, products));

// total quantity : go, pipe, sum 

const total_quantity_go = products =>
  _go(products, _map(a => a.quantity), _reduce((a, b) => a + b));

console.log(total_quantity_go(products));

const total_quantity_pipe = _pipe(_map(a => a.quantity), _reduce(add));

console.log(total_quantity_pipe(products));

const total_quantity = products => sum(a => a.quantity, products)

console.log(total_quantity(products));

const total_price_go = products => _go(products, _map(a => a.price * a.quantity), _reduce(add))

console.log(total_price_go(products));

const total_price_pipe = _pipe(_map(a => a.price * a.quantity), _reduce(add));

console.log(total_price_pipe(products));

const total_price = products => sum(a => a.price * a.quantity, products)

console.log(total_price(products));

// currying implementation to sum

const sumC = curry((f, iter) => _go(iter, _map(f), _reduce(add)));

const total_quantityC = sumC(a => a.quantity);

console.log(total_quantityC(products));

const total_priceC = sumC(a => a.price * a.quantity);

console.log(total_priceC(products));
