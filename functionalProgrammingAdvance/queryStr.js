const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

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

const queryStr = obj => go(
  obj,
  Object.entries,
  map(([k,v] => `${k}:${v}`))
)

console.log(queryStr({limit: 10, offset: 10, type: 'notice'}));
