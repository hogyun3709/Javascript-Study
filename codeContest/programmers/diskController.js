function solution(jobs) {
  var answer = 0;
  let processed = new Array(jobs.length).fill(false);
  let leadtime = new Array(jobs.length).fill(0);
  let cursorTime = 0;

  let selectedIndex = -1;
  let complete = false;
  while (!complete) {
    complete = true;
    selectedIndex = -1;
    let candidate = [];
    let isWaited = false;
    for (let i = 0; i < jobs.length; i++) {
      if (!processed[i]) {
        complete = false;
        if (jobs[i][0] <= cursorTime) {
          candidate.push(i);
          isWaited = true
        }
      }
    }

    if (!isWaited) {
      for (let i = 0; i < jobs.length; i++) {
        if (!processed[i]) {
          candidate.push(i);
          complete = false;
        }
      }
      if (complete)
        break;
      selectedIndex = candidate.reduce((a, el) => {
        a = (jobs[el][0] <= jobs[a][0])
          ? el
          : a;
        return a;
      }, candidate[0])
    } else {
      if (complete)
        break;
      selectedIndex = candidate.reduce((a, el) => {
        a = (jobs[el][1] <= jobs[a][1])
          ? el
          : a;
        return a;
      }, candidate[0])
    }

    if (!isWaited)
      cursorTime += (jobs[selectedIndex][0] - cursorTime) + jobs[selectedIndex][1];
    else
      cursorTime += jobs[selectedIndex][1];

    processed[selectedIndex] = true;
    leadtime[selectedIndex] = cursorTime - jobs[selectedIndex][0];
  }

  for (let i = 0; i < leadtime.length; i++)
    answer += leadtime[i];

  answer = parseInt(answer / leadtime.length);
  return answer;
}
