const array = [1, 5, 2, 6, 3, 7, 4]
const commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
function solution(array, commands) {
    return commands.map(v => {
        return array.slice(v[0] - 1, v[1]).sort((a, b) => a - b).slice(v[2] - 1, v[2])[0];
    });
}
