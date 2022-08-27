function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const middle = Math.ceil((left + right) / 2);
    console.log(arr[middle]);
    if (arr[middle] === target) {
      return true;
    }
    if (arr[middle] > target) {
      right = middle - 1;
    }
    if (arr[middle] < target) {
      left = middle + 1;
    }
    console.log(left, right);
  }
  return false;
}

const arr = [1, 2, 4, 5, 7, 10, 30, 56];
console.log(binarySearch(arr, 50));
