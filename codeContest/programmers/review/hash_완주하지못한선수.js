const participant = ["leo", "kiki", "eden"]
const completion = ["eden", "kiki"]

function solution(participant, completion){
  /* Sort array alphbetically */
  participant.sort();
  completion.sort();

  for(let i in participant){
    if(participant[i] !== completion[i]) return participant[i]
  }
}

console.log(solution(participant, completion))
