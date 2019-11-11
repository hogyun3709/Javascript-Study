## 안전한 합성

1. map으로 합성하기
  const f = x => x + 10;
  const g = x => x - 5;
  const fg = x => f(g(x));
  console.log(f(g(10)));

  // 모나드  monad  합성

  _.go(
    [10],
    L.map(fg),
    _.each(console.log)
  )

2. find 대신 L.filter 를 써보기

  const users = [
    { name: "AA", age: 35 },
    { name: "BB", age: 26 },
    { name: "CC", age: 28 },
    { name: "DD", age: 34 },
    { name: "EE", age: 23 }
  ];
  // 배열의 특정 조건으로 자료를 찾아보자
  // find 에서는 undefined 가 들어오면 if 로 처리가 가능하나,
  // filter 에서는 if 를 써주지 않아도됨
  const user = _.find(u => u.name == 'BB', users);
  if (user) {
    console.log(user);
  }

  _.each(console.log,
    L.take(1,
      L.filter(u => u.name == 'BB', users))
  )

  _.go(users,
    L.filter(u => u.name == 'BB'),
    L.take(1),
    L.map(u => u.age),
    _.each(console.log)
  )
