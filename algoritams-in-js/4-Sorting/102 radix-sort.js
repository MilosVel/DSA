function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  // return Math.floor(Math.log10(Math.abs(num))) + 1;
  return Math.ceil(Math.log10(Math.abs(num)))
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

console.log('Krajnji rezultat je: ', radixSort([23, 345, 5467, 12, 2345, 0]))




// let digitBuckets = Array.from({ length: 10 }, () => [2, 3, 4, 5]);
// digitBuckets[3] = ['MILOS']
// console.log('Array', digitBuckets)



console.log(Math.log10(20))