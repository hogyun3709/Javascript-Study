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

<script>
  /* 일어날 일들에 대하여 각종의 condition(조건) 을 control 할수 있음*/
  const track = [
    { cars: ['Chulsu', 'Younghee', 'Chulhee', 'Youngsu']},
    { cars: ['Harden', 'Curry', 'Durrant', 'Tomson']},
    { cars: ['Paul', 'Smith', 'Lichard', 'Mccaurry']},
    { cars: ['SpiderMan', 'IronMan']},
    { cars: ['']},
  ]

  _.go(
    L.range(Infinity),
    L.map(i => track[i]),
    /* 4명이 준비완료된 배열만 -> 구조분해 */
    // L.takeWhile(({ cars }) => cars.length == 4),
    L.map(({cars}) => cars),
    L.map(_.delay(1000)),
    L.takeWhile(cars => cars.length == 4),
    // L.takeWhile(({length: l}) => l == 4),
    /* 4명 미만이여도 출발 - takeWhile 을 적용하면 첫배열만 출력*/
    // L.takeUntil(({length: l}) => l < 4),
    L.flat,
    L.map(car => `${car} 출발!`),
    _.each(console.log)
  )
</script>

<script>
/* 결제누락이슈는 네트워크 상의 연결 문제 및 서버통신간의 야기할수 있는 여러문제로 발생할 수 있음*/
/* */
const Impt = {
  payments: {
    1: [
      { imp_id: 11, order_id: 1, amount: 15000 },
      { imp_id: 12, order_id: 2, amount: 25000 },
      { imp_id: 13, order_id: 3, amount: 10000 },

    ],
    2:[

      { imp_id: 14, order_id: 4, amount: 25000 },
      { imp_id: 15, order_id: 5, amount: 45000 },
      { imp_id: 16, order_id: 6, amount: 15000 },
    ],
    3:[

      { imp_id: 17, order_id: 7, amount: 20000 },
      { imp_id: 18, order_id: 8, amount: 30000 },
    ],
    4:[],
    5:[]
  },
  getPayments: page => {
    console.log(`http://..?page=${page}`);
    return _.delay(1000 * 2, Impt.payments[page])
  },
  cancelPayment: imp_id => Promise.resolve(`${imp_id}: 취소완료`)
}

const DB = {
  getOrders: ids => _.delay(100, [
    { id: 1},
    { id: 3},
    { id: 7}
  ])
}
/* 결제 내역 가져오기 */
async function job(){
  /*
    결제된 결제모듈측 payments 를 가져오고,
    page 단위로, 결제 데이터가 있는 부분까지만
    모두 가져와 하나의 배열로 합침
  */
  const payments = await _.go(
    L.range(1, Infinity),
    L.map(Impt.getPayments),
    /* 최대값보다만 적게 */
    L.takeUntil(({length}) => length < 3),
    _.flat
  )
  /* 결제가 성공된 Id를 뽑아라 */
  const orderIds = await _.go(
    payments,
    _.map(p => p.order_id),
    DB.getOrders,
    _.map(({id}) => id)
  )
  console.log(orderIds);

  await _.go(
    payments,
    L.reject(p => orderIds.includes(p.order_id)),
    L.map(p => p.imp_id),
    L.map(Impt.cancelPayment),
    _.each(console.log)
  )
}
job()

(function recur(){
  Promise.all([
    _.delay(7000, undefined),
    job()
  ]).then(recur)
}) ();
</script>
