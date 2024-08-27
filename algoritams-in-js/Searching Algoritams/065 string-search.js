function naiveSearch(long, short) { /// BITNO   *****-------******//////////********** */
    var count = 0;
    for (var i = 0; i < long.length; i++) {
        for (var j = 0; j < short.length; j++) {
            if (short[j] !== long[i + j]) break;
            if (j === short.length - 1) count++;
        }
    }
    return count;
}

naiveSearch("lorie loled", "lol")

//////////////////////
//////////////////////
//////////////////////
//////////////////////

function naiveSearch(long, short) { /// BITNO   *****-------******//////////********** */
    var count = 0;
    for (var i = 0; i < long.length; i++) {
        for (var j = 0; j < short.length; j++) {
            if (short[j] !== long[i + j]) {
                break;
            }
            if (j === short.length - 1) {
                console.log(j, short.length)
                count++;
            }
        }
    }
    return count;
}

naiveSearch("lorie loled", "lol")