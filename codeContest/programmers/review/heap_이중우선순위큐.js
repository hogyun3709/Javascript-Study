// const operations = [
//   "I 16",
//   "I -5643",
//   "D -1",
//   "D 1",
//   "D 1",
//    "I 123",
//    "D -1"
//  ]; //[0,0]

const operations2 = [
  "I -45",
  "I 653",
  "D 1",
  "I -642",
  "I 45",
  "I 97",
  "D 1",
  "D -1",
  "I 333"
]; //[333, -45]

/*
  문제 예시에 오류가있음 [-45, 45, 333] 이 정답임
  ops 가 3개고 element 는 6 개 인데 element 가 2개가 될수가 있나..?
  문제의 feature 는 구현해놓음..
  1. split Decision/Action (Delete) and value
  2. program handles each operations
*/
function solution(operations) {
  var answer = [];
  const checkAction = /[D, I]/g;
  var sepActNum = [];
  var queue = [];
  for (let i = 0; i < operations.length; i++) {
    sepActNum.push(operations[i].split(" "));
  }

  for (let i = 0; i < operations.length; i++) {
    if (sepActNum[i][0] === "I") {
      queue.push(Number(sepActNum[i][1]));
    }

    if (sepActNum[i][0] === "D") {
      if (sepActNum[i][1] === "1") {
        queue.splice(1, Math.max(...queue));
      }
      if (sepActNum[i][1] === "-1") {
        queue.splice(1, Math.min(...queue));
      }
    }
  }
  answer = queue;
  return answer;
}

console.log(solution(operations2));
