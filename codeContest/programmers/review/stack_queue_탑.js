const heights = [1, 5, 3, 6, 7, 6, 5];
/* incomplete */
function solution(heights) {
  const tower = heights.map((element, index) => {
    return { height: element, position: index + 1 };
  });
  console.log(tower);

  let target = [];
  let queue = [];
  var answer = [];

  // while (tower.length > 0) {
  //   target = tower.pop();
  //   for (let i = tower.length - 1; i > -1; i--) {
  //     if (target.height < tower[i].height) {
  //       queue.push(tower[i].position);
  //     }
  //     if (target.height > tower[i].height){
  //       queue.push(0)
  //     }
  //   }
  //   answer.unshift(queue.shift());
  // }
  while (tower.length > 0) {
    target = tower.pop();
    for (let i = 1; i < tower.length + 1; i++) {
      if (target.height < tower[tower.length - i].height) {
        queue.push(tower[tower.length - i].position);
      }
      if (target.height > tower[tower.length - i].height) {
        queue.push(0);
      }
    }
    answer.unshift(queue.shift());
  }

  console.log(answer);
}

console.log(solution(heights));

/* 뽑은 값이 prevs 값보다 작으면 0 */
