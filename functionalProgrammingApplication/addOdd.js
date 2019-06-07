//imperative

function f1(limit, list) {
  let acc = 0;
  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit == 0) break;
    }
  }
  console.log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// iterable / lisp
function f2(limit, list) {
  let acc = 0;
  for (const a of L.filter(a => a % 2, list)) {
    const b = a * a;
    acc += b;
    if (--limit == 0) break;
  }
  console.log(acc);
}

f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
