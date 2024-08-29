// function factorial(num) { /// BITNO   *****-------******//////////********** */
//     if (num === 1) return 1;
//     return num * factorial(num - 1);
// }

// factorial(5)

console.log('FAKTORIJAL')
let counter = 1
function factorial(num) { /// BITNO   *****-------******//////////********** */
    console.log(counter)
    console.log('Num je: ', num)
    if (num === 1) return 1;
    let helper = num * factorial(num - 1); // ovde se nagomilava stack
    counter++
    console.log('helper je: ', helper, 'Counter je: ', counter)
    console.log('Counter je:  ', counter)
    return helper
}

console.log(factorial(5))