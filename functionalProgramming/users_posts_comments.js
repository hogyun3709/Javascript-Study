//predefined functions

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

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get("length");

function _each(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter);

var _pairs = _map(function(val, key) {
  return [key, val];
});

var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  var fns = arguments;
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
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

var _values = _map(_identity);

function _identity(val) {
  return val;
}

var _pluck = _curryr(function(data, key) {
  return _map(data, _get(key));
});

function _negate(func) {
  return function(val) {
    return !func(val);
  };
}

var _reject = _curryr(function(data, predi) {
  return _filter(data, _negate(predi));
});

var _compact = _filter(_identity);

var _find = _curryr(function(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }
});

var _find_index = _curryr(function(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}

function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

var _group_by = _curryr(function(data, iter) {
  return _reduce(
    data,
    function(grouped, val) {
      return _push(grouped, iter(val), val);
    },
    {}
  );
});

var _inc = function(count, key) {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
};

var _count_by = _curryr(function(data, iter) {
  return _reduce(
    data,
    function(count, val) {
      return _inc(count, iter(val));
    },
    {}
  );
});

var _head = function(list) {
  return list[0];
};

// start

const users = [
  { id: 101, name: "ID" },
  { id: 102, name: "BJ" },
  { id: 103, name: "PJ" },
  { id: 104, name: "HA" },
  { id: 105, name: "JE" },
  { id: 106, name: "JI" }
];
const posts = [
  { id: 201, body: "내용1", user_id: 101 },
  { id: 202, body: "내용2", user_id: 102 },
  { id: 203, body: "내용3", user_id: 103 },
  { id: 204, body: "내용4", user_id: 102 },
  { id: 205, body: "내용5", user_id: 101 }
];
const comments = [
  { id: 301, body: "댓글1", user_id: 105, post_id: 201 },
  { id: 302, body: "댓글2", user_id: 104, post_id: 201 },
  { id: 303, body: "댓글3", user_id: 104, post_id: 202 },
  { id: 304, body: "댓글4", user_id: 105, post_id: 203 },
  { id: 305, body: "댓글5", user_id: 106, post_id: 203 },
  { id: 306, body: "댓글6", user_id: 106, post_id: 204 },
  { id: 307, body: "댓글7", user_id: 102, post_id: 205 },
  { id: 308, body: "댓글8", user_id: 103, post_id: 204 },
  { id: 309, body: "댓글9", user_id: 103, post_id: 202 },
  { id: 310, body: "댓글10", user_id: 105, post_id: 201 }
];

//1. 특정인의 posts의 모든 comments 거르기

function posts_by(attr) {
  return _.where(posts, attr);
}

const comments_by_posts = _pipe(_pluck("id"), function(post_ids) {
  return _.filter(comments, function(comment) {
    return _.contains(post_ids, comment.post_id);
  });
});

_go(
  // _.filter(posts, function(post) {
  //   return post.user_id == 101;
  // }),
  // _.where(posts, {user_id: 101}),
  posts_by({ user_id: 101 }),

  // _map(function(post){
  //   return post.id
  // }),
  comments_by_posts,
  console.log
);

//2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기

_go(
  // _.where(posts, {user_id: 101}),
  posts_by({ user_id: 101 }),

  comments_by_posts,
  _map(function(comment) {
    return _find(users, function(user) {
      return user.id == comment.user_id;
    }).name;
  }),
  _.uniq,
  console.log
);

//3. 특정인의 posts에 comments 단 친구들의 카운트 정보
_go({ user_id: 101 },
  posts_by,
  comments_by_posts,
  _map(function(comment) {
    return _find(users, function(user) {
      return user.id == comment.user_id;
    }).name;
  }),
  _count_by,
  console.log
);
