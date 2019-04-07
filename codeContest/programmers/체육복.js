function solution(n, lost, reserve) {
    var answer = n;

    let r = reserve.filter(x => lost.indexOf(x) == -1);
    let l = lost.filter( x => reserve.indexOf(x) == -1);

    r.forEach( x => {
        let flag =
            l.indexOf(x - 1) != -1 ?
            l.indexOf(x - 1): l.indexOf(x + 1) !=  -1 ?
            l.indexOf(x + 1) : null;
        if(flag != null){
            l.splice(flag,1);
        }
    })

    answer -= l.length;
    return answer;
}
