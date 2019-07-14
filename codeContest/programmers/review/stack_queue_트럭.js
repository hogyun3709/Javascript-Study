const bridge_length = 2;
const weight = 10;
const truck_weights = [7, 4, 5, 6];
/* incomplete */
function solution(bridge_length, weight, truck_weights) {
  var answer = 0;
  var counter = 0;
  /*
    다리를 건너는 트럭 고르기
  */
  var truck_on_bridge = [];
  var truck_on_bridge_max = truck_on_bridge.reduce((acc, cv) => {
    return acc + cv;
  }, 0);
  var truck_moved_complete = [];

  while (truck_weights.length > 0) {
    /* 다리가 트럭의 무게를 견딜수있다면*/
    if (truck_on_bridge_max < weight) {
      truck_on_bridge = truck_weights.shift();
      counter++;
    }
    if (truck_on_bridge_max > weigth) {

    }
    truck_moved_complete.push(truck_on_bridge);

  }
  console.log(counter);
}

console.log(solution(bridge_length, weight, truck_weights));
