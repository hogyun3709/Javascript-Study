const arr1 = [2,9,7,10]
const divisor = 15
function checkNothing(arr, divisor){
    return arr % divisor === 1
}
function solution(arr, divisor) {
    var answer = [];
    for( let i = 0; i < arr.length; i++){
        if(arr[i] % divisor === 0){
            answer.push(arr[i])
        } else if (arr.every(checkNothing) == true){
            return answer.push(-1)
        }
    }
    return answer.sort((a,b) => a - b);
}
