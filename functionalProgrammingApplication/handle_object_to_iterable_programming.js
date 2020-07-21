<script>
 console.log(Object.values(obj1)) /* (4) [1,2,3,4]*/

 /* Values 를 구현해보자 */

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
</script>
