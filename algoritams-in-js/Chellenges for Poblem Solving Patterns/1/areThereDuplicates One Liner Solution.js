function areThereDuplicates(arguments) {
    console.log('Duzina niza je: ', arguments.length)
    console.log('Duzina seta je: ', new Set(arguments).size)
    return new Set(arguments).size !== arguments.length;
}


console.log(areThereDuplicates([2, 3, 4, 5, 7, 2, 2]))