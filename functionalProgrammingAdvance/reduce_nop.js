const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const isIterable = a => a && a[Symbol.iterator];

const go1 = (a, f) => a instanceof Promise ? a.then(f): f(a);

const reduceP = (acc, a, f) =>
  a instanceof Promise ?
    a.then(a => f(acc, a), e => e == nop ? acc : Promise.reject(e)) :
    f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceP(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});
// Before
// const reduce = curry((fns, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   } else {
//     iter = iter[Symbol.iterator]();
//   }
//   return go1(acc, function recur(acc){
//     let cur;
//     while (!(cur = iter.next()).done) {
//       const a = cur.value;
//       // acc 는 1, a 는 promise 라 결과는
//       // 1[object Promise][object Promise]로 나옴
//       acc = fns(acc, a);
//       if (acc instanceof Promise) return acc.then(recur);
//     }
//     return acc;
//   });
// });

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then(a => (res.push(a), res).length == l ? res : recur())
          .catch(e => e == nop ? recur() : Promise.reject(e));
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  } ();
});

const takeAll = take(Infinity);

const L = {};

L.range = function *(l) {
  let i = -1;
  while (++i < l) yield i;
};

L.map = curry(function *(f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const nop = Symbol('nop');

L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
    else if (b) yield a;
  }
});

L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *a;
    else yield a;
  }
};

L.deepFlat = function *f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *f(a);
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a));

const flatten = pipe(L.flatten, takeAll);

const flatMap = curry(pipe(L.map, flatten));

var add = (a, b) => a + b;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};


/* Relevent Code starts from here */
// 이터러벌 중심 프로그래밍 시 용이하게 값을 다룬다
// 동기 / 비동기 상황을 제어하기 위하여

go([1,2,3,4],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  reduce((a ,b) => a + b),
  console.log
)
go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => {
    console.log(a);
    return new Promise(resolve => setTimeout(() => resolve(a * a), 1000))
  }),
  L.filter(a => {
    console.log(a);
    return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))
  }),
  take(2),
  reduce(add),
  console.log);
// Apply nop in to reduce: support lazy eval and Promise
