<script>
_.go(
  _.range(10),  // - 0 부터 9 까지의 배열
  _.take(3),  // - 앞에서 3개만 자르기
  _.each(console.log)
)
/* !중요, 위 아래 코드는 실행 순서의 차이가있음 가로 / 세로(지연적 평가) */
_.go(
  L.range(1, 10), // - 0 부터 9까지의 이터러블, 최대 10번 일어날일 / 0-9의 배열을 만드는 것이아닌, 최대 10번의 일을 예약함의 목적
  //L.map(n => _.delay(500 * n, n)), // 뒤로 갈수록 출력될 값의 시간이 지연됨
  L.map(_.delay(1000)),
  L.filter(a => a % 2),
  L.map(_ => new Date()),
  L.take(3), // - 최대 3개의 값을 필요하고, 최대 3번의 일을수행 / 최대 3번의 일이 필요로하다
  _.each(console.log)
)
</script>

<script>
/* 로직을 작성할때, 어디까지, 언제까지, 선택적으로 실행을 할것이냐 조절이가능*/
_.go(
  [1, 2, 3, 4, 5, 6, 7, 8, 0, 0 ],
  _.takeWhile(a => a),
  _.each(console.log)
)

_.go(
  [1, 2, 3, 4, 5, 6, 7, 8, 0, 0],
  _.takeUntil(a => a), // 만족하는 값을 찾을때 까지
  _.each(console.log);
)

_.go(
  [0, false, undeifned, null, 10, 20],
  _.takeUntil(a => a),
  _.each(console.log)
)

</script>
