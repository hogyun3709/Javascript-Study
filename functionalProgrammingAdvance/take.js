const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

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

const add = (a,b) => a + b;

const _go = (...args) => _reduce((a, fns) => fns(a), args);

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const L = {};

L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter){
    res.push(a);
    if(res.length == limit) return res;
  }
  return res;
});

console.log(range(100));
console.time('');
_go(
  range(10000),
  take(5),
  _reduce(add),
  console.log
)
console.timeEnd('');

console.time('');
_go(
  L.range(10000),
  take(5),
  _reduce(add),
  console.log
)
console.timeEnd('');
