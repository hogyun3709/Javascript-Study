//imperative

function f1(limit, list) {
  let acc = 0;
  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit == 0) break;
    }
  }
  console.log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// iterable / lisp
function f3(limit, list) {
  let acc = 0;
  for (const a of L.map(a => a * a, L.filter(a => a % 2, list))) {
    acc += b;
    if (--limit == 0) break;
  }
  console.log(acc);
}

f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// L.map 에서 몇개의 값을 받아와도 limit 값만 next 하게됨
function f4(limit, list){
  let acc = 0;
  for (const a of L.take(limit, L.map( a => a * a, L.filter(a => a % 2, list))))  {
    acc += a;
  }
  console.log(acc);
}
f4(3, [1,2,3,4,5,6,7,8,9])

// Reduce 로 합산 하기
const add = (a,b) => a + b
function f5(limit, list){
  console.log(
    _.reduce(add,
      L.take(limit,
        L.map(a => a * a,
          L.filter(a => a % 2, list)
        ))
    )
  )
  _.go(
    list,
    L.filter(a => a % 2),
    L.map(a => a * a),
    L.take(limit),
    _.reduce(add),
    console.log
  )
}
f5(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// while 을 사용한 평범한 방법, 명령형의 스마트한 버전, range로 변환

function f6(end){
  let i = 0;
  while (i < end){
    console.log(i);
    i++
  }
}

function f6_1(end){
  let i = 1;
  while (i < end){
    console.log(i)
    i += 2;
  }
}
function f6_2(end){
  _.each(console.log, L.range(1, end, 2));
}
f6(10);
f6_1(10);
f6_2(10);
