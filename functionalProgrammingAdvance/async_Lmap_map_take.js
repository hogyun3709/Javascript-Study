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
  iter = iter[Symbol.iterator]();
  return function recur(){
    let cur;
    while(!(cur = iter.next()).done){
      const a = cur.value;
      if(a instanceof Promise) return a.then(
        a => (res.push(a), res).length == limit ? res : recur());
      // if (a instanceof Promise) return a.then(a => {
      //   res.push(a);
      //   return res.length == limit ? res : recur();
      //   // if(res.length == limit) return res;
      //   // return recur();
      // })
      res.push(a);
      if (res.length == limit) return res;
    }
    return res;
  }();
  });

L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function*(fns, iter) {
  for (const a of iter) {
    yield go1(a, fns);
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
// 값이 Promise 일때 처리
// L.map 에는 go1 적용
// take 에는 Promise check recursive 적용
go(
    [1, 2, 3],
    L.map(a => Promise.resolve(a + 10)),
    take(2),
    console.log);
  go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => a + 10),
    take(2),
    console.log);
  go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => Promise.resolve(a + 10)),
    take(2),
    console.log);
  go(
    [1, 2, 3],
    map(a => Promise.resolve(a + 10)),
    console.log);
  go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    map(a => a + 10),
    console.log);
  go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    map(a => Promise.resolve(a + 10)),
    console.log);
