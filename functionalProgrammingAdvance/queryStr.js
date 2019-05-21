const L = {};

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
const _pipe = (f, ...fns) => (...args) => _go(f(...args), ...fns)


// const _queryStr = obj => _go(
//   obj,
//   Object.entries,
//   _map(([k,v]) => `${k}:${v}`),
//   _reduce((a,b) => `${a}&${b}`)
// )
const _queryStr = _pipe(
  Object.entries,
  _map(([k,v]) => `${k}:${v}`),
  _reduce((a,b) => `${a}&${b}`)
)

console.log(_queryStr({limit: 10, offset: 10, type: 'notice'}));
