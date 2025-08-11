const array = [2,3,5, 'string', 'www']

type Arr = typeof array

type ExcludeFromArray<T extends any[], ToExclude> = Exclude<T[number], ToExclude>[]

type ResultString = ExcludeFromArray<Arr,number> // type ResultString = string[]

type ResultNumber = ExcludeFromArray<Arr,string> // type ResultNumber = number[]

//////////////////////  hepler


type helper = Arr[number] // type helper = string | number

type helper2 = Exclude<helper, number> // type helper2 = string
type helper3 = Exclude<helper, string> // type helper3 = number

///////////////////  basic helper

type basicHelper = number | string
type basicHelper2 = Exclude<basicHelper, number> // type basicHelper2 = string
type basicHelper3 = Exclude<basicHelper, string> // type basicHelper3 = number



