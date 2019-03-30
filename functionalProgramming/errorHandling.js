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
const add = _curry(function(a, b) {
  return a + b;
});

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
const _get = _curryr(function _get(obj, key) {
  return obj == null ? undefined : obj[key];
});
var _length = _get("length");
function _each(list, iter) {
  for (var i = 0, len = _length(list); i < len; i++) {
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

_each(null, console.log);
console.log(
  _map(null, function(v) {
    return v;
  })
);

/// _keys 만들기
/// 만드는 이유 Object.keys(null)를 핸들링 하지 못해서
console.log(Object.keys({ name: "ID", age: 33 }));
console.log(Object.keys([10, 20, 4, 6]));
console.log(Object.keys(10));
// //type error
// console.log(Object.keys(null));
console.log(_keys(null));

function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
/// each 다형성 높히기
// 예외적인 데이터가 들어와도, 함수의 연속 실행성을 방해받지않게끔
// 어떠한 데이터 형이 들어와도, 보조함수의 조작이 용이하게 가능
function _each(list, iter) {
  const keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

_each(
  {
    13: "ID",
    23: "HD",
    34: "YD"
  },
  function(name) {
    console.log(name);
  }
);
console.log(
  _map(
    {
      13: "ID",
      22: "HD",
      44: "Yd"
    },
    function(name) {
      return name.toLowerCase();
    }
  )
);
