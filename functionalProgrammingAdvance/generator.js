// # Generator = iterator 를 생성하는 함수

function *gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter = gen();

console.log(iter[Symbol.iterator]() == iter);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// # odds
function *infinity(i = 0) {
  while (true) yield i++;
}

function *limit(v, iter){
  for (const a of iter){
    yield a;
    if(a == v) return;
  }
}
function *odds(v) {
  for (const a of limit(v, infinity(1))) {
    if (a % 2) yield a;
    if (a == v) return;
  }
  for (let i = 0; i < v; i++) {
    if (i % 2) yield i;
  }
}
let iter2 = odds(10);

console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

// 40 라는 limit 을 주고 홀수 뽑
for (const a of odds(40)){
  console.log(a)
}

// #
