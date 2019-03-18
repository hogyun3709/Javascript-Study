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

// 1. 명령형 코드
// A. 30세 이상인 users 를 걸러낸다.
const temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
// B. 30세 이상인 user의 name을 수집한다.
const temp_names = [];
for (var i = 0; i < temp_users.length; i++) {
  temp_names.push(temp_users[i].name);
}
console.log(temp_names);

// C. 30세 미만인 users를 걸러낸다.
const temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);

// D. 30세 미만인 usesr의 age를 수집한다.

const temp_ages = [];
for (var i = 0; i < temp_users.length; i++) {
  temp_ages.push(temp_users[i].age);
}
console.log(temp_ages);

// 2. _filter, -map 으로 Refactoring
// 함수형 프로그래밍은 함수 내부에 데이터형을 찾아볼수 없다
// 함수 자체의 재사용성이 높다
// 대입문을 줄인다
//
function _filter(list, predi) {
  const new_list = [];
  for (var i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }
  return new_list;
}
function _map(list, mapper) {
  const new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

const over_30 = _filter(users, function(user) {
  return user.age >= 30;
});

console.log(over_30);

const names = _map(over_30, function(user) {
  return user.name;
});

console.log(names);

const under_30 = _filter(users, function(user) {
  return user.age < 30;
});
console.log(under_30);

const ages = _map(under_30, function(user) {
  return user.age;
});

console.log(ages);
console.log(
  _map(
    _filter(users, function(user) {
      return user.age >= 30;
    }),
    function(user) {
      return user.name;
    }
  )
);
