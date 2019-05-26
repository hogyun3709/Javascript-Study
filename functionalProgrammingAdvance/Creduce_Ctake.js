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

/* 지연된 함수열을 병력적으로 평가해보자 - C.reduce, C.take */
const C = {};
function noop(){}
const catchNoop = arr => (arr.forEach( a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curry((fns, acc, iter) => {
  const iterCheck = catchNoop(iter ? [...iter] : [...acc]);
  return iter ?
    reduce(fns, acc, iterCheck):
    reduce(fns, iterCheck)});

C.take = curry((limit, iter) => take(limit, catchNoop([...iter])));

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll))

C.filter = curry(pipe(L.filter, C.takeAll))

const delay500 = a => new Promise(resolve => {
  console.log('hi');
  setTimeout(() => resolve(a), 500)
});


//C.reduce 를 사용시 hi 가 5번 연속적으로 실행됨
//병렬적인 실행
go([1,2,3,4,5],
  L.map(a => delay500( a * a)),
  L.filter(a => delay500( a % 2)),
  L.map(a => delay500( a * a)),
  C.take(2),
  reduce(add),
  console.log,
  _ => console.timeEnd('')
)
/* 즉시 병렬적으로 평가하기: C.map, C.filter*/
// 특정 함수 라인에서마 병렬적으로 평가하기

C.map(a => delay500(a * a), [1,2,3,4]).then(console.log);
C.filter(a => delay500(a % 2), [1,2,3,4]).then(console.log);
