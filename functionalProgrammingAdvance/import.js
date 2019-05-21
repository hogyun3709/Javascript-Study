const L = {};
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const _go = (...args) => _reduce((a, fns) => fns(a), args);
const _pipe = (f, ...fns) => (...args) => _go(f(...args), ...fns);
const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
const isIterable = a => a && a[Symbol.iterator];
const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter){
    res.push(a);
    if(res.length == limit) return res;
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
L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function*(fns, iter) {
  for (const a of iter){
    yield fns(a);
  }
});
L.filter = curry(function*(fns, iter) {
  for (const a of iter){
    if (fns(a)) yield a;
  }
});
L.flatMap = curry(_pipe(L.map, L.flatten));
L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
const flatten = _pipe(L.flatten, take(Infinity));
const _map = curry(_pipe(L.map, take(Infinity)));
const _filter = curry(_pipe(L.filter, take(Infinity)));
const flatMap = curry(_pipe(L.flatMap, flatten));
/* Relevent Code starts from here */
