const L = {};
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const go = (...args) => reduce((a, fns) => fns(a), args);
const pipe = (f, ...fns) => (...args) => go(f(...args), ...fns);
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
const reduce = curry((fns, acc, iter) => {
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
L.flatMap = curry(pipe(L.map, L.flatten));
L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
const flatten = pipe(L.flatten, take(Infinity));
const map = curry(pipe(L.map, take(Infinity)));
const filter = curry(pipe(L.filter, take(Infinity)));
const flatMap = curry(pipe(L.flatMap, flatten));
/* Relevent Code starts from here */

const arr = [
  [1,2],
  [3,4,5],
  [6,7,8],
  [9,10]
];

go(arr,
  L.flatten,
  L.filter(a => a % 2),
  L.map(a => a * a),
  take(4),
  reduce((a, b) => a+b),
  console.log
)
