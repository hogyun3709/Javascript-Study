<script>
/* js의 내장값인 Map/ Set 은 사용자 정의 객체로도 이터러블하게 프로그래밍이 가능하다 */

let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

_.go(
  m,
  _.filter(([k, v]) => v % 2),
  entries => new Map(entries),
  console.log
)

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

console.log([...s])
const add = (a, b) => a + b;
console.log(_.reduce(add, s))

</script>
