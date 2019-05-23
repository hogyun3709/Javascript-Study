// 모나드는 함수 합성을 안전하게 도와주는 도구이다
// f(g(x))

const g = a => a + 1;
const f = a => a * a;

console.log(f(g(1)));
// 4
console.log(f(g()));
// NaN

// array perspective monad function composition

Array.of(1).map(g).map(f).forEach(res => console.log(res));
// 4
[].map(g).map(f).forEach(r => console.log(r));
// forEach 내부의 함수 실행이 되고있지않다.

// Promise perspective monad function composition
Promise.resolve(2).then(g).then(f).then(res => console.log(res));
// Promise 는 asyn 상황에서 함수 합성을 안정하게 하려고한다.
Promise.resolve().then(g).then(f).then(res => console.log(res));
//NaN
new Promise(resolve =>
setTimeout(() => resolve(2), 100)).then(g).then(f).then(res => console.log(res));
