function solution(phone_number) {
    var answer = '';
    var invisbleLength = phone_number.length - 4;
    var invisible = '';
    for (let i = 0; i < invisbleLength; i++){
        invisible += '*'
    }
    answer = invisible + phone_number.substring(phone_number.length - 4)
    return answer;
}
