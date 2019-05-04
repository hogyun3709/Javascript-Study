const L = {}
L.filter= function*(fns, iter) {
  for (const a of iter) {
    if(fns(a)) yield a ;
  }
};

const iter = L.filter(a => a % 2, [1,2,3,4]);

console.log(it.next());
console.log(it.next());
console.log(it.next());
