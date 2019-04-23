
const _filter = (fns, iter) => {
  let res = [];
  for (const a of iter) {
    if (fns(a)) {
      res.push(a);
    }
  }
  return res;
};

const _map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const _reduce = (fns, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter){
    acc = fns(acc, a);
  }
  return acc
};
