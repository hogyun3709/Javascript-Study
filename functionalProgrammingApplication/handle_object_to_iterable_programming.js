<script>
 console.log(Object.values(obj1)) /* (4) [1,2,3,4]*/

 /* 1. Values 를 구현해보자 */

 L.values = function *(obj){
   for (const k in obj){
     console.log(k)
     yield obj[k];
   }
 }
 /*
  원하는 시점에서 평가가 가능하고, array 출력의 메모리를 제어할수 있다
  > var it = L.values(obj1);
  > it = L.take(2, it);
  > [...it]
    a
    b
 */
 /* Arr의 크기가 커진다면 컨트롤하기에 용이해짐 */

 _.go(
   obj1,
   Object.values,
   // _.map(a => a + 10),
   _.reduce((a, b) => a + b),
   console.log
 )

 _.go(
   obj1,
   L.values,
   L.map(a => a + 10),
   L.take(2),
   _.reduce((a, b) => a + b),
   console.log
 )

 /* 2. Entries 를 구현해보자 */

 /* key 와 value 에 모두 yield*/

 L.entries = function *(obj) {
   for (const k in obj){
     yield [k, obj[k]];
   }
 }

 /* entries 를 활용하여 특정 function 을 적용한 key 와 value를 하나의 object 로 assign */
 /* Obj array 에서 홀수의 value를 가진 key value 쌍을 하나의 오브젝트로 */
 /* Key Point = array 값이 어떻든 iterable 하게 프로그래밍이 가능*/
 _.go(
   obj1,
   L.entries,
   L.filter(([_, v]) => v % 2),
   L.map(([k, v]) => ({[k]: v})),
   _.reduce(Object.assign),
   console.log
 )
 /* 3. Keys 를 구현해보자*/

   L.keys = function *(obj){
     for (const k in obj){
       yield k;
     }
   }
  /* Shows every keys in the obj1 array */
   _.go(
     obj1,
     L.keys,
     _.each(console.log)
)
 /* 4. 어떠한 값이던 이터러블 프로그래밍으로 다뤄보기 */
 const g1 = function *(stop){
   let i = -1;
   while (++i < stop){
     yield 10;
     if (false) yield 20 + 30;
     yield 30;
   }
 }

 console.log([...L.take(3, g1(10))])

 _.go(
   g1(10),
   L.take(2),
   _.reduce((a,b) => a + b),
   console.log
 )

 /* object 화? */
 const a = [['a', 1], ['b', 2], ['c', 3]];
 const b = { a: 1, b:2, c:3 }

 /* 1안 */

 const objectGo = entries => _.go(
   entries,
   L.map(([k, v]) => ({[k]: v})),
   _.reduce(Object.assign)
 );

 console.log('Entries 배열을 Object: 로',objectGo(a))
 /* 다형성이 높은 객체임 */
 const objectReduce = entries =>
   _.reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

 console.log('Reduce를 활용: ', objectReduce(a))

 /* 사용자 정의 객체가 iterable 관련된 규약을 가지고있음 */
 let m = new Map();
 m.set('a', 10);
 m.set('b', 20);
 m.set('c', 30);
 /* m 은 iterable 을 지원함 */
 console.log('Map: ', objectReduce(m))
</script>
