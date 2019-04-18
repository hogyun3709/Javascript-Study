// Declarative method
var users = [
  { id: 10, name: "ID", age: 36 },
  { id: 20, name: "BJ", age: 21 },
  { id: 30, name: "FJ", age: 36 },
  { id: 40, name: "BS", age: 51 },
  { id: 50, name: "AW", age: 12 },
  { id: 60, name: "VI", age: 21 },
  { id: 70, name: "WA", age: 33 },
  { id: 80, name: "GI", age: 34 },
  { id: 90, name: "SK", age: 22 }
];

const tmp_users = [];
for (let i = 0; i < users.length; i++){
  if (users[i].users_any_keys_name >= 30){
    tmp_users.push(users[i]);
  }
}

// Functional method
// Check condition while loop executes
function _filter(users, predi) {
  var new_list = [];
  for (let i = 0; i < users.length; i++){
    if (predi(users[i])){
      new_list.push(users[i])
    }
  }
  return new_list
}

// Return mapper
function _map(list, mapper){
  var new_list = [];
  for (let i = 0; i < list.length; i++){
    new_list.push(mapper(list[i]))

  }
  return new_list;
}

// filter function usage

console.log(
  _filter(users, function(user){ return user.age >= 30 })
);

// map function usage
console.log(
  _map(users, function(user){ return user.age })
);

// function 쌓기
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.users_any_keys_name; }
  )
);




