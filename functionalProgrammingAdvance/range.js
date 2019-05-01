const add = (a, b) => a + b;
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




const L = {}
const add = (a, b) => a + b;
L.range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};


var list = L.range(4);

console.log(list.reduce(add));
