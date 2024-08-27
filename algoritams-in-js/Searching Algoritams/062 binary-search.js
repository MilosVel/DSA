// Original Solution
function binarySearch(arr, elem) { /// BITNO   *****-------******//////////********** */
    var start = 0;
    var end = arr.length - 1;
    var middle = Math.floor((start + end) / 2);
    console.log('Pocetni middle je: ', middle)
    while (arr[middle] !== elem && start <= end) {
        if (elem < arr[middle]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
        middle = Math.floor((start + end) / 2);
        console.log('Start', start, 'End: ', end, 'middle:', middle)
    }
    if (arr[middle] === elem) {
        return middle;
    }
    return -1;
}

// // Refactored Version
function binarySearch(arr, elem) {  /// BITNO   *****-------******//////////********** */
    var start = 0;
    var end = arr.length - 1;
    var middle = Math.floor((start + end) / 2);
    while (arr[middle] !== elem && start <= end) {
        if (elem < arr[middle]) end = middle - 1;
        else start = middle + 1;
        middle = Math.floor((start + end) / 2);
    }
    return arr[middle] === elem ? middle : -1;
}

console.log('Krajnji rezultet je: ', binarySearch([2, 5, 6, 9, 13, 15, 28, 30], 28))

