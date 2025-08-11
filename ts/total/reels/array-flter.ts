const array = [2,3,5, 'string', 'www']

type Arr = typeof array

type ExcludeFromArray<T extends any[], ToExclude> = Exclude<T[number], ToExclude>[]

type ResultString = ExcludeFromArray<Arr,number> // type ResultString = string[]

type ResultNumber = ExcludeFromArray<Arr,string> // type ResultNumber = number[]

