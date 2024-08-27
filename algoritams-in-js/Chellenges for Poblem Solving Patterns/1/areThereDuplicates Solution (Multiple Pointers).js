function areThereDuplicates(...args) {
    console.log(args)
    // Two pointers
    args.sort((a, b) => a > b);
    // console.log('Sortirani argumenti: ', args)
    let start = 0;
    let next = 1;
    while (next < args.length) {
        if (args[start] === args[next]) {
            return true
        }
        start++
        next++
    }
    return false
}
////         funkcija vraca true samo ako su ista dva uzastopna clana ista


console.log(areThereDuplicates('5', '1', '8', "6", '4', '1', '8', '1', '1', '7')) // vraca true 
// console.log(areThereDuplicates('R', 'K', 'M', "M", 'O', 'P', 'M ')) // vraca true
// console.log(areThereDuplicates('M', "M  V", 'M ')) // vraca false