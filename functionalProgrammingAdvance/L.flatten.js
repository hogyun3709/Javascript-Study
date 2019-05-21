L = {};
const _go = (...args) => _reduce((a, fns) => fns(a), args);
const _pipe = (f, ...fns) => (...args) => _go(f(...args), ...fns);
const isIterable = a => a && a[Symbol.iterator];

const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
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

L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) yield b;
    } else yield a;
  }
};

L.flattenG = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};
var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);

console.log(it.next());
console.log(it.next());
console.log(take(4, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));
// console.log([...it]);

const flatten = _pipe(L.flatten, take(Infinity));

console.log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));

console.log([...L.deepFlat([1, [2, [3, 4, [5]]]])]);
