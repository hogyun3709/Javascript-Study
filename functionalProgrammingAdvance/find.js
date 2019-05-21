const L = {};

const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const _map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

L.map = curry(function*(fns, iter) {
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    yield fns(a);
  }
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

L.filter = curry(function*(fns, iter) {
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    if (fns(a)) yield a;
  }
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

const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
  }
  return res;
});

const users = [
  { age: 32 },
  { age: 29 },
  { age: 23 },
  { age: 28 },
  { age: 34 },
  { age: 49 },
  { age: 38 },
  { age: 22 },
  { age: 25 }
];
// const find = (f, iter) =>
//   _go(
//     iter,
//     // filter function loops all the way through the array
//     _filter(a => (console.log(a), f(a))),
//     // following line takes functions, and shows the fns outs
//     a => (console.log(a), a),
//     // FL implies very first value of implemented fns
//     take(1),
//     ([element]) => element
//   );

const find = curry((f, iter) =>
  _go(iter, L.filter(f), take(1), ([element]) => element)
);

console.log(find(a => a.age < 30)(users));

_go(users, L.map(u => u.age), find(n => n < 30), console.log);
