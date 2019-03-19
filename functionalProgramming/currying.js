const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 }
];

// What is currying?
// - process of a function with multiple arguments and returning a series of functions that resolves to a value
// - Lodash library takes the role of currying in javascript
function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b);
        };
  };
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a);
        };
  };
}
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _filter(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if (predi(val)) {
      new_list.push(val);
    }
  });
  return new_list;
}
function _map(list, mapper) {
  const new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

const add = _curry(function(a, b) {
  return a + b;
});

const add10 = add(10);

console.log(add10(5));
//returns 15
console.log(add(10)(5));
console.log(add(1, 2));

const sub = _curryr(function(a, b) {
  return a - b;
});

console.log(sub(10, 5));
const sub10 = sub(10);
console.log(sub10(5));

//get function 만들기

// function _get(obj, key) {
//   return obj == null ? undefined : obj[key];
// }

const user1 = users[0];

const _get = _curryr(function _get(obj, key) {
  return obj == null ? undefined : obj[key];
});

console.log(user1.name);
console.log(_get("name")(user1));
const get_name = _get("name");

console.log(get_name(user1));

console.log(
  _map(
    _filter(users, function(user) {
      return user.age >= 30;
    }),
    _get("name")
  )
);
