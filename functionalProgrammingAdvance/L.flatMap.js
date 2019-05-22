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
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};


L.map = curry(function*(fns, iter) {
  for (const a of iter) {
    yield fns(a);
  }
});

L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
const flatten = _pipe(L.flatten, take(Infinity));
const _map = curry(_pipe(L.map, take(Infinity)));

// console.log([[1,2],[3,4],[5,6,7]].flatMap(a => a));
// console.log([[1,2],[3,4],[5,6,7]].flatMap(a => a.map(a => a*a)));
// console.log(flatten([[1,2],[3,4],[5,6,7]].map(a => a.map(a => a*a))));

L.flatMap = curry(_pipe(L.map, L.flatten));
const flatMap = curry(_pipe(L.map, flatten));

var it = L.flatMap(_map(a => a * a), [[1, 2], [3, 4], [5, 6, 7]]);

console.log([...it]);
console.log(flatMap(a => a, [[1, 2], [3, 4], [5, 6, 7]]));
console.log(_map(range, [1,2,3]));
console.log(flatMap(L.range, [1,2,3]));
//more use cases on lecture video
