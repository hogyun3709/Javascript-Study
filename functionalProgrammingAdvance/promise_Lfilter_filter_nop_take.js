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
      if(a instanceof Promise) {
        return a
        .then(a => (res.push(a), res).length == limit ? res : recur())
        .catch(e => e == nop ? recur() : Promise.reject(e));
      }
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
const nop = Symbol('nop')
L.filter = curry(function*(fns, iter) {
  for (const a of iter) {
    const b = go1(a, fns)
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop))
    else if (b) yield a;
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

// filter 에서 이후의 함수가 reject 가 된다면 실행하지않고 error handling 
go([1,2,3,4,5,6],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => {
    console.log(a);
    return a % 2;
  }),
  L.map(a => {
    console.log(a);
    return a * a;
  }),
  take(4),
  console.log
)
