const s = 'javascript is fun'

function solution(s) {
    var answer = '';
    /* Need to split each single string due to evaulation*/
    var tmp = s.split('');
    for(let i = 0; i < s.length; i++){
        if(i % 2 == 0){
            answer += tmp[i].toUpperCase()
        } else if (i % 2 === 1){
            answer += tmp[i].toLowerCase()
        }
    }
    return answer;
}

console.log(solution(s));
