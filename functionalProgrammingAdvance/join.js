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
const _pipe = (f, ...fns) => (...args) => _go(f(...args), ...fns);
const _join = curry((sep = ",", iter) =>
  _reduce((a, b) => `${a}${sep}${b}`, iter)
);

L.entries = function *(obj){
  for (const k in obj ) yield [k, obj[k]]
};

var it = L.entries({ limit: 10, offset: 10, type: "notice" });
console.log(it.next());
console.log(it.next().value);
console.log(it.next().value);

const _queryStr_ex = _pipe(
  Object.entries,
  a => (console.log(a), a),
  L.map(([k, v]) => `${k}:${v}`),
  function(a){
    console.log(a);
    return a
  },
  _join('&')
);
const _queryStr = _pipe(
  L.entries,
  L.map(([k, v]) => `${k}:${v}`),
  _join('&')
);


console.log(_queryStr({ limit: 10, offset: 10, type: "notice" }));
