/* 약수의 합 구하기*/
const n = 12

function hello(n){
  let sumOfDivisor = 0;
  let listOfDivisor = [];
  for (let i = 1; i <= n; i++){
    if( n % i === 0){
      sumOfDivisor += i
      listOfDivisor.push(i)
    }
  }

  return sumOfDivisor;
  /* return listOfDivisor */
}

console.log(hello(n));

/* 행렬의 덧셈 */

const arr1  = [[1,2],[2,3]];
const arr2 = [[3,4,],[5,6]];

function world(arr1, arr2){
  var answer = [[]];
  answer = arr1.map(
    /* arr1을 맵핑한 curArr 와 그의 첫번째 index 를 명시 */
    (curArr, index) => curArr.map(
      /* 두번째 인덱스에 access 하기위해서 한번더 mapping 후 parallel 하게 더해주기 */
      (arr1Map, indexLater) => arr1Map + arr2[index][indexLater]
    )
  )
  return answer;
}
console.log(world(arr1, arr2));
