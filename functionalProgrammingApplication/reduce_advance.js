/*
  reduce + 복잡한 함수 + acc 보다
  map + 간단한 함수 + reduce
*/
const users = [
  { name: 'AA', age: 35},
  { name: 'BB', age: 26},
  { name: 'CC', age: 28},
  { name: 'DD', age: 34},
  { name: 'EE', age: 23},
];
/* 더 좋은 reduce 는 시작 값을 선언 하지 않는 것*/
console.log(
  _.reduce((total, user) => total + user.age, 0, users)
)
/* map 을 이용하여 acc 값 선언 없이 reduce 실행*/
console.log(
  _.reduce((a, b) => a +b, L.map(user => user.age, users))
)
/* 모듈화(?) 시켜보기 */
const add = (a, b) => a + b;
const ages = L.map(user => user.age);
console.log(
  _.reduce(add, ages(users))
);
