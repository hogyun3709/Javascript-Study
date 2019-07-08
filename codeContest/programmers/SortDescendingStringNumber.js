const n = '972564311'

function solution(n) {
  const convertToStringArray = Array.from(n.toString());
  const sortDescending = convertToStringArray.sort((a,b) => b - a);
  const parseInteger = sortDescending.map(x => parseInt(x, 10));
  const result = Number(parseInteger.join(""))
  return result;
}
