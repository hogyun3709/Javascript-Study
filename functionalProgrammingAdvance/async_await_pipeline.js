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

function delayI(a) {
   return new Promise(resolve => setTimeout(() => resolve(a), 100));
 }

/* Relevent Code starts from here */
// async 와 pipeline 이 해결하려는 문제는 서로 다르다
// async = 문장형으로 함수를 다룬다, 함수를 풀어 놓기 위한 목적, 비동기 상황을 동기적인 문장으로 풀어서 프로그래밍 하기 위함
// pipeline = iterable 중심적 사고인 pipeline 는 함수 합성이 목적, 연속적인 함수 실행으로 효과적 함수 조합을 용이하게 하기위함, 테스트, 유지보수
// f6 에서 동기적 실행법

function f5(list){
  return go(list,
    L.map(a => delayI(a * a)),
    L.filter(a => delayI(a % 2)),
    L.map(a => delayI(a + 1)),
    take(3),
    reduce((a,b) => delayI(a + b))
  )
}

go(f5([1,2,3,4,5,6,7,8]),console.log)

async function f6(list){
  let temp = [];
  for (const a of list){
    const b = await delayI(a * a);
    if (await delayI(b % 2)){
      const c = await delayI(b + 1);
      temp.push(c);
      if (temp.length == 3) break;
    }
  }
  let res = temp[0], i = 0;
  while (++i < temp.length){
    res = await delayI(res + temp[i]);
  }
  return res;
}

go(f6([1,2,3,4,5,6,7,8]), console.log)
