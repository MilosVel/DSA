// function insertionSort(arr) {
//     var currentVal;
//     for (var i = 1; i < arr.length; i++) {
//         console.log(i)
//         currentVal = arr[i];
//         for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
//             arr[j + 1] = arr[j]
//         }
//         arr[j + 1] = currentVal;
//     }
//     return arr;
// }

// insertionSort([2, 1, 9, 76, 4])


/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////

function insertionSort(arr) {
    let j;
    var currentVal;
    for (var i = 1; i < arr.length; i++) {
        currentVal = arr[i];
        for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            // for (var j = i - 1; j >= 0; j--) {
            console.log('I je: ', i, 'J je: ', j)
            arr[j + 1] = arr[j]
            console.log('Arrej je ', arr)
        }
        console.log('Zavrsava se i koje je:  *********   :  ', i, 'a j je: ', j)
        arr[j + 1] = currentVal;
    }
    return arr;
}

console.log('Krajnji rezultat je: ', insertionSort([2, 1, 9, 76, 4]))