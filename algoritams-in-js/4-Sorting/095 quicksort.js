function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  console.log(arr)
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  console.log('Right', right, "left", left)
  if (left < right) {
    // if (right - left > 0) {
    // if (right > -1) {
    let pivotIndex = pivot(arr, left, right) //3
    //left
    quickSort(arr, left, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

console.log('Krajnji rezultet: ', quickSort([4, 6, 9, 1, 2, 5, 3, 23]))


// // [4,6,9,1,2,5,3]
// // [3,2,1,4,6,9,5]
// //        4
// //  3,2,1    6,9,5
// //      3      6
// //  2,1      5  9
// //    2
// //  1




