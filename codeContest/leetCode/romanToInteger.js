var romanToInt = function(s) {
  var map = {};
  map["I"] = 1;
  map["V"] = 5;
  map["X"] = 10;
  map["L"] = 50;
  map["C"] = 100;
  map["D"] = 500;
  map["M"] = 1000;
  var res,
    tmp = 0;
  for (var i = s.length - 1; i >= 0; i--) {
    if (!res) {
      res = map[s[i]];
      continue;
    }
    if (map[s[i]] >= map[s[i + 1]]) {
      res += map[s[i]];
    } else {
      res -= map[s[i]];
    }
  }
  return res;
};
