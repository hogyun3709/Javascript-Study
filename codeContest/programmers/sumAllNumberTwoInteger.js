function solution(a, b) {
    var bigger = 0;
    var smaller = 0;
    if(a > b){
        bigger = a;
        smaller = b;
    } else if (a < b){
        bigger = b;
        smaller = a;
    } else {
        return a
    }
    var n = (bigger - smaller + 1);
    var answer = n * (bigger + smaller) / 2;
    return answer
}
