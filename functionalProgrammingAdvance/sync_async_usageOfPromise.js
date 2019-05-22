const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100));

//sync method
const go1 = (a, f) => f(a);
const add5 = a => a + 5;

console.log(go1(10, add5));
console.log(go1(Promise.resolve(10), add5));
//res [obejct promise]5
console.log(go1(delay100(10), add5));
//res [obejct promise]5

// check param is asyn or not
const go2 = (a, fns) => a instanceof Promise ? a.then(fns) : fns(a);

var r = go2(10, add5);

console.log(r);

var r2 = go2(delay100(10), add5);

r2.then(console.log);

go2(go2(10, add5), console.log);
go2(go2(delay100(10), add5), console.log);

const n1 = 10;
// undefined = 즉시실행 & 최종
console.log(go2(go2(10, add5), console.log));
const n2 = delay100(10);
// Promise[pending] = Promise 를 이어줌 / 지속적 Promise 연결이 가능
console.log(go2(go2(delay100(10), add5),console.log));
