// Promise.then 의 중요한 규칙
// 많은 promise 가 중첩되어있어도 한번의 .then 으로 값을 찾을수있다.

Promise.resolve(Promise.resolve(1)).then(function(a){
  console.log(a);
})

new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(console.log);
