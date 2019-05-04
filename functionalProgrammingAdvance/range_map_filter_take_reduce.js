const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const _go = (...args) => _reduce((a, fns) => fns(a), args);

const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const _map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    res.push(f(a));
  }
  // for (const a of iter) {
  //   res.push(f(a));
  // }
  return res;
});

const _filter = curry((fns, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
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
  } else {
    iter = iter[Symbol.iterator]();
  }
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    acc = fns(acc, a);
  }
  return acc;
});

const _take = curry((limit, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
  }
  return res;
});

const L = {};
L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};
L.map = curry(function*(fns, iter) {
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    yield fns(a);
  }
});

L.filter = curry(function*(fns, iter) {
  iter = iter[Symbol.iterator]();
  let tmp;
  while (!(tmp = iter.next()).done) {
    const a = tmp.value;
    if (fns(a)) yield a;
  }
});

_go(range(10), _map(a => a + 10), _filter(a => a % 2), _take(2), console.log);

_go(
  L.range(10),
  L.map(a => a + 10),
  L.filter(a => a % 2),
  _take(2),
  console.log
);
