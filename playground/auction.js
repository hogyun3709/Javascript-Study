const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const _filter = curry((fns, iter) => {
  let res = [];
  for (const a of iter) {
    if (fns(a)) {
      res.push(a);
    }
  }
  return res;
});

const all_items = [
  { name: "short-sleeve-t-shirt", price: 15000 },
  { name: "long-sleeve-t-shirt", price: 20000 },
  { name: "phone-case", price: 15000 },
  { name: "hoodie", price: 30000 },
  { name: "pants", price: 25000 },
  { name: "pants", price: 25001 },
  { name: "pants", price: 25002 }
];

const _search = (all_items, searching_items) =>
  _filter(a => a.name == searching_items, all_items);

console.log(..._search(all_items, "pants"));
