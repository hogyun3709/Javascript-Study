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

console.log(
  _.reduce((total, user) => {
    if(user.age >= 30) return total;
    return total + user.age;
  }, 0, users),
  'if statement'
)
/* 삼항 연산자로 보기에만 간단히*/
console.log(
  _.reduce((total, user) => user.age >= 30 ? total : total + user.age, 0, users),
  'ternary operator'
)
/* filter 로 30세 미만의 나이를 합산*/
console.log(
  _.reduce((total, user) => total + user.age,
  0,
  _.filter(user => user.age < 30, users)),
  'filter'
)
console.log(
  _.reduce(add,
    /* 결국 합산하는 목적을 가진 함수이기에 add reducer 함수를 실행시키겠다고 선언.*/
    /* (total, user) => total + user.age 는 add 로 대체된다.*/
    /* 유저 배열의 age 만 맵으로 뽑겠다. */
    _.map(user => user.age,
      _.filter(user => user.age < 30, users))),
  'map & filter'
)

/* query 만들기 */

const obj1 = {
  a: 1,
  b: undefined,
  c: "CC",
  d: "DD"
};
function query1(obj) {
  /* 누적하여 한줄로 만들수 있음*/
  let res = "";
  for (const key in obj) {
    /* obj1 의 key 값을 추출 */
    // console.log(a)
    /* obj1 의 value 값을 추출 */
    const value = obj[key];
    if (value === undefined) continue;
    if (res != '') res += '&';
    // console.log(key + '=' + value)

    res += key + "=" + value;
  }
  return res;
}
console.log(query1(obj1));

function query2(obj) {
  return Object.entries(obj)
    .reduce((query, [k, v], i) => {
      if(v === undefined) return query;
      return query + (i > 0 ? '&' : '') + k + '=' + v;
    }, '')
}
console.log(query2(obj1))

/* 함수형 프로그래밍에서는 쓰지않 변수를 _ 로 처리함 원래 들어가야할 변수는 key 값*/
function query3(obj) {
  return (
    /* reduce로 축약하여 a,b 로 들어오는 key와 value쌍 사이에 값을 삽입*/
    _.reduce(
      (a, b) => `${a}&${b}`,
      /* 같은 자료의 형으로 변환한 다음,*/
      _.map(
        ([k, v]) => `${k}=${v}`,
        /* _.filter(([k, v]) => !== undefined, Object.entries(obj)) */
        /* undefined 를 걸러내고, */
        _.reject(([_, v]) => v === undefined, Object.entries(obj))
      )
    )
  );
}
console.log(query3(obj1));

/* join 을 만들어 조금 더 간결하게 */

const join = _.curry((sep, iter) =>
  _.reduce((a,b) => `${a}${sep}${b}`, iter));

const query4 = obj =>
  join('&',
    _.map(([k, v]) => `${k}=${v}`,
      _.reject(([_, v]) => v === undefined,
        Object.entries(obj)
      )
    )
  )
console.log(query5(obj1), 'query 4')

/* go를 사용하여 조금 더 직관적이게 */

/* go 대신 pipe로 obj 를 받아오는 부분을 간결하게 만들수 있음*/
const query5 = obj => _.go(
  obj,
  Object.entries,
  _.reject(([_, v]) => v === undefined),
  _.map(join('=')),
  /* _.map(([k, v]) => `${k}=${v}`), */
  join('&')
)

console.log(query5(obj1));
