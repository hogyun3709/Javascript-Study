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

const slice = Array.prototype.slice;

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

function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    // list = list.slice(1);
    list = _rest(list);
  }
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  const fns = arguments;
  return function(arg) {
    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  function(a) {
    return a + 1;
  },
  function(a) {
    return a + 1;
  },
  function(a) {
    return a + 1;
  },
  console.log
);

console.log(
  _map(
    _filter(users, function(user) {
      return user.age < 30;
    }),
    _get("age")
  )
);
var _map = _curryr(_map);
var _filter = _curryr(_filter);
_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get("name"));
  },
  console.log
);

_go(
  users,
  _filter(function(user) {
    return user.age < 30;
  }),
  _map(_get("age")),
  console.log
);

_go(users, _filter(user => user.age < 30), _map(_get("age")));
