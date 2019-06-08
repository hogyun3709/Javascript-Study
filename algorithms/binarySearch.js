let arr = [1, 3, 5, 7, 8, 9];
let arrLength = arr.length - 1;

const recurBinary = (arr, target, start, end) => {
  let mid = Math.floor((start + end) / 2);
  if (start > end) return `찾으시는 숫자 ${target}(이)가 배열에 존재하지 않습니다`;
  if (arr[start] === target) return `찾으시는 숫자 ${target}(이)가 배열의 첫번째 인덱스에 있습니다`
  if (arr[end] === target) return `찾으시는 숫자 ${target}(이)가 배열의 마지막 인덱스에 있습니다`;
  if (arr[mid] === target) return `찾으시는 숫자 ${target}(이)가 배열의 ${mid + 1} 번째에 있습니다`;
  if (arr[mid] > target) {
    return recurBinary(arr, target, start, mid - 1)
  } else return recurBinary(arr, target, mid + 1, end)

}

console.log(recurBinary(arr, 1, 0, arrLength));
console.log(recurBinary(arr, 5, 0, arrLength));
console.log(recurBinary(arr, 6, 0, arrLength));
console.log(recurBinary(arr, 9, 0, arrLength));

const iterBinary = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[start] === target) return `찾으시는 숫자 ${target}(이)가 배열의 첫번째 인덱스에 있습니다`

    if (arr[mid] === target) return `찾으시는 숫자 ${target}(이)가 배열의 ${mid + 1} 번째에 있습니다`;
    if (arr[end] === target) {
      return `찾으시는 숫자 ${target}(이)가 배열의 마지막 인덱스에 있습니다`
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return `찾으시는 숫자 ${target}(이)가 배열에 존재하지 않습니다`
}
console.log(iterBinary(arr, 1));
console.log(iterBinary(arr, 7));
console.log(iterBinary(arr, 6));
