const progresses = [93, 30, 55];
const speeds = [1, 30, 5];

function solution(progresses, speeds) {
  let answer = [];
  let deploy = 1;
  /*
    progress 와 소요날짜 를 합한 obj 로 진행합니다
  */
  const progressDate = progresses.map((item, index) => {
    return {
      progresses: item,
      speeds: speeds[index],
      date: Math.ceil((100 - item) / speeds[index]),
      id: index
    };
  });

  while (progressDate.length > 0) {
    let readyToDeploy = progressDate.shift();
    /* 먼저 배포 되어야할 항목이 있는지 체크 */
    var hasHighPriority = progressDate.some(
      element => element.date < readyToDeploy.date
    );
    /* 먼저 배포 되어야할 항목이 1개 이상일 경우 에러..*/
    if (hasHighPriority) {
      deploy++;
      progressDate.shift();
      answer.push(deploy);
      deploy = 1;
    } else {
      progressDate.shift();
      answer.push(deploy);
      deploy = 1;
    }
  }
  return answer
}

console.log(solution(progresses, speeds));
