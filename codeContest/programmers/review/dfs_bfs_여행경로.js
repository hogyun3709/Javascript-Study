const tickets = [
  ["ICN", "SFO"],
  ["ICN", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "ICN"],
  ["ATL", "SFO"]
];
/*In progress*/
function solution(tickets) {
  var answer = [];
  var queue = [];
  var first = [];
  const ticketsDetail = tickets.map((item, index) => {
    return {
      origin: tickets[index][0],
      destination: tickets[index][1],
      id: index
    };
  });
  const tmp = ticketsDetail.sort(function(a, b) {
    var destinA = a.destination;
    var destinB = b.destination;
    if (destinA < destinB) {
      return -1;
    }
    if (destinA > destinB) {
      return 1;
    }
    return 0;
  });
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].origin === "ICN") {
      first.push(tmp[i].origin);
      first.push(tmp[i].destination);
    }
  }

  var queue = first.slice(0, 2);
  console.log(queue);
  console.log(tmp);
  while(tmp > 1){
    if( tmp === queue[1])
  }
}

console.log(solution(tickets));
