// Four fundamental types of collection based programming and its functions
//1. 수집하기 - map, values, pluck
//2. 거르기 - filter, reject, compact, without
//3. 찾아내기 - find, some, every
//4. 접기 - reduce, min, max, group_by, count_by

var users = [
  { id: 10, name: "ID", age: 36 },
  { id: 20, name: "BJ", age: 21 },
  { id: 30, name: "FJ", age: 34 },
  { id: 40, name: "BS", age: 51 },
  { id: 50, name: "AW", age: 12 },
  { id: 60, name: "VI", age: 21 },
  { id: 70, name: "WA", age: 33 },
  { id: 80, name: "GI", age: 34 },
  { id: 90, name: "SK", age: 22 }
];
//predfined functions
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
  const keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}
function _map(list, mapper) {
  var new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
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

// 1.map

// -map practice

console.log(
  _map(users, function(user) {
    return user.name;
  })
);

function _identity(val) {
  return val;
}

// function _values(data) {
//   return _map(data, function(val) {
//     return val;
//   });
// }

// - map 을 이용하여 values 만들기
function _values(data) {
  return _map(data, _identity);
}

console.log(users[0]);
console.log(_keys(users[0]));
console.log(_values(users[0]));
// pluck 만들기 - obj의 val 값을 수집 및 정리하기 용이함

function _pluck(data, key) {
  return _map(data, function(obj) {
    return obj[key];
  });
}
console.log(_pluck(users, "age"));

//2. _filter

// -reject
function _negate(fns) {
  return function(val) {
    return !fns(val);
  };
}
function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

// function _reject(data, predi) {
//   return _filter(data, function(val) {
//     return !predi(val);
//   });
// }

console.log(
  _reject(users, function(user) {
    return user.age > 30;
  })
);

// - compact

var _compact = _filter(_identity);

console.log(_filter([1, 2, 0, false, null, {}], _identity));
console.log(_compact([1, 2, 0, false, null, {}]));
