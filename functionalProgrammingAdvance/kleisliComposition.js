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
const reduce = curry((fns, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fns(acc, a);
  }
  return acc;
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
/* Relevent Code starts from here */
const find = curry((f, iter) =>
  go(iter, L.filter(f), take(1), ([element]) => element)
);
// 오류가 있을수도 있을만한 함수 합성시 사용되는 규칙

//f(g(x)) = f(x)

var users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" }
];
const getUserById = id =>
  find(u => u.id == id, users) || Promise.reject("없어요!");
const f = ({ name }) => name;
const g = getUserById;
// const fg = id => f(g(id));
// If Promise = reject, 바로 catch 로 흘려보내준다
const fg = id =>
  Promise.resolve(id).then(g).then(f).catch(a => a);

fg(2).then(console.log)
