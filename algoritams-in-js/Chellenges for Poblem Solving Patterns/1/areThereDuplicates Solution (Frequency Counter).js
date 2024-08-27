function areThereDuplicates(...arguments) {
    console.log('Arguments are: ', arguments)
    let collection = {}
    for (let val in arguments) {
        collection[arguments[val]] = (collection[arguments[val]] || 0) + 1
    }

    console.log('Kolekcija je: ', collection)

    for (let key in collection) {
        if (collection[key] > 1) return true
    }

    return false;
}


console.log(areThereDuplicates('M', 'V', 'M'))






//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// let niz = [1, 2, 4, 6, 6]

// for (let val in niz) {
//     console.log('Val tj. indekx je: ', val, 'vrednost za taj indeks je ', niz[val])
// }


//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

// let niz1 = [3, 2, 54, 6, 7, 2, 5, 6, 2]

// for (let i of niz1) {
//     console.log('I odnosno indekx je: ', i)
// }


//////////////////////////////////
//////////////////////////////////
//////////////////////////////////


// let obj = {
//     ime: 'Milos',
//     prezime: 'Velickovic',
//     hobi: ['Programiranje', 'Sah', 'Sport']
// }


// for (let i in obj) {
//     console.log(' obj[i] je:  ', obj[i])
// }