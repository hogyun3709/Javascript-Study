function solution(clothes) {
    var answer = 1;
    var obj = {}            //중복되는 의상을 처리하기 위해 json 객체 사용
    clothes.forEach(function(element){
        if(obj[element[1]]>=1)    //중복되는 키 값이 존재할 때 +1
            obj[element[1]] +=1
        else                    //처음 등장하는 의상일 때 1로 초기화
            obj[element[1]] = 1
    })
    for(var x in obj)            //json 객체에 담긴 값으로 계산
        answer *= (obj[x]+1)
    return answer-1;
}
