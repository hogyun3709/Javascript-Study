const priorities = [2, 1, 3, 2];
const l = 2;
function solution(priorities, l) {
  let answer = 0;
  /* Mapping array due to get index as accessible value */
  let arr = priorities.map((priority, index) => {
    return {
      priority: priority,
      index: index
    };
  });
  console.log(arr);
  let queue = [];
  /*
    결국 priority 가 큰 순으로 queue 에 정리가 된다
    arr will be empty
  */
  while (arr.length > 0) {
    var targetElement = arr.shift();
    /*
      Use some method
      functoin condition 이 만족되면 return true
    */
    var hasHighPriority = arr.some(
      ele => ele.priority > targetElement.priority
    );
    /*
      뽑아낸 array element 보다 큰 숫자가 있으면, 뽑아낸 array element 를  arr의 last 로 push
      Recursively
    */
    if (hasHighPriority) {
      arr.push(targetElement);
    } else {
      queue.push(targetElement);
    }
  }
  /* use findIndex, to find 맵핑으로 설정해놓은 고유값으로 만든 index */
  queue.findIndex(queueElement => queueElement === l)
  /* 순서를 return 해야하니, index 값에 + 1 을 해준다. */
  return ansawer + 1;
}

console.log(solution(priorities, l));
