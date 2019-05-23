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
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
  }
  return res;
});

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
L.filter = curry(function*(fns, iter) {
  for (const a of iter) {
    if (fns(a)) yield a;
  }
});
L.flatten = function*(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
L.flatMap = curry(pipe(L.map, L.flatten));

const flatten = pipe(L.flatten, take(Infinity));
const map = curry(pipe(L.map, take(Infinity)));
const filter = curry(pipe(L.filter, take(Infinity)));
const flatMap = curry(pipe(L.map, flatten));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduce = curry((fns, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  // 초기 값이 promise 여도 go 1 함수로 처리 가능
  return go1(acc, function recur(acc){
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = fns(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

/* Relevent Code starts from here */
