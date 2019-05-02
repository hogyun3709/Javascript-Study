const add = (a, b) => a + b;
const _reduce = (fns, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fns(acc, a);
  }
  return acc;
};

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

console.log(range(5));

var list = range(4);

console.log(list.reduce(add));

// L.range 는 array 를 만들지 않고 값을 꺼내기만한다.

const L = {};

L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

var list = L.range(4);

console.log(list);

console.log(_reduce(add, list));

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test("L.range", 10, () => _reduce(add, L.range(10000000)));
test("range", 10, () => _reduce(add, range(10000000)));
