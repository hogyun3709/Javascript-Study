const L = {}
L.map = function*(fns, iter) {
  for (const a of iter) {
    yield fns(a);
  }
};

var it = L.map(a => a + 10, [1, 2, 3]);

console.log([...it]);

console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log(it.next().value);
