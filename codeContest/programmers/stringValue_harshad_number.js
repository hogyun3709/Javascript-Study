/* 문자열 value 다루기 */
function solution(s) {
  /* s의 정규식 0-9 숫자인지 확인후 string length 4, 6 인지 확인 */
  return /^[0-9]+$/.test(s) && [4, 6].includes(s.length);
}
/* Check given integer is harshad number or not*/
const x = 10;
function solution(x) {
  var sum = 0;
  var arr = x.toString().split("");
  
  for (var i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }

  return x % sum == 0 ? true : false;
}

console.log(solution(x));
