function delay(a) {
  return new Promise(resolve => setTimeout(() => resolve(a), 500));
}
// 해당 함수를 await 를 적용하려면 promise 를 리턴해야한다.
async function f1() {
  const a = await delay(10);
  const b = await delay(5);

  console.log(a + b);
}
f1();
/*f1 실행값 = 15*/

// async 함수는 Promise 만을 return 하는 함수다

//promise 를 전달하지도 않았는데 promise 가 리턴된다.
async function f2() {
  const a = 10;
  const b = 5;
  return a + b;
}
console.log(f2());
/*f2 실행값 = Promise{<resolved>: 15}*/

async function f3() {
  const a = await delay(10);
  const b = await delay(5);

  return a + b;
}

console.log(f3());
/*f3 실행값 = Promise{<pending>}*/

async function f4() {
  const a = 10;
  const b = 5;
  console.log(a + b);
}

/*f4 실행값 = 15*/

/* async 함수 내부에서만 모든 부수 효과를, 로직을 처리한다면 가능. 폐쇄적임*/
/* .then 함수를 쓰면 값으로 추출이 가능*/
console.log('f3');
f3().then(console.log);
/* 아래의 방식으로도 값 표현이 가능*/
/* async 로 떨어진 promise 를 await 로 평가한다*/
(async () => {
  console.log(await f3());
})();

const pa = Promise.resolve(10);

(async () => {
  console.log(await pa);
})();
