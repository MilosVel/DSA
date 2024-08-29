function collectOddValues(arr) { /// BITNO   *****-------******//////////********** */
    console.log('Args su: ', arr)
    let newArr = [];

    console.log('newArr je (1): ', newArr)

    if (arr.length === 0) {
        return newArr;
    }

    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0]);
    }

    newArr = newArr.concat(collectOddValues(arr.slice(1)));
    console.log('newArr je (2): ', newArr)
    return newArr;
}

collectOddValues([1, 2, 3, 4, 5])

