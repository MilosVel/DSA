////////////////   1. Strict Omit

/////    Loose Omit

type Spread<T1, T2> = T2 & Omit<T1, keyof T2>

type Example = Spread<
    { overwriteMe: string, x: null },
    { overwriteMe: number, dontOverwriteMe: boolean }
>

let spreadObj: Example = {
    overwriteMe: 33,
    dontOverwriteMe: true,
    x: null
}



type User = {
    id: string,
    name: string;
}


type OmitUser = Omit<User, 'name'>
type OmitUser1 = Omit<User, 'anyThing'>   // This will not throw error

////   We can create our own custom Strict Omit

type StrictOmit<T, K extends keyof T> = Omit<T, K>

type StrictOmitUser = StrictOmit<User, 'name'>
// type StrictOmitUser1 = StrictOmit<User, 'anyThing'>   // Type '"anyThing"' does not satisfy the constraint 'keyof User'



////////////////       2. NEGATED TYHPES

type AnythingExeptClick = string   // There is not something like this:  type AnythingExeptClick = string - 'click'

const addGlobalHandler = <T extends string>(
    event: T extends 'click' ? never : T
) => {
 //   ... implementation
}


addGlobalHandler('anyThing')
// addGlobalHandler('click') // Argument of type 'string' is not assignable to parameter of type 'never'



/////////////////  3. NOMINAL TYPES


/////   Problem Explanation with Nominal Types
type AbsolutePath_1 = string
type RelativePath_1 = string

const absolutePath_1: AbsolutePath_1 = 'path/to/file'
const relativePath_1: RelativePath_1 = '../../file'

const acceptsAbsolutePath_1 = (path:AbsolutePath_1) =>path
acceptsAbsolutePath_1(relativePath_1)    // We need to make it Throw error



////  Solution for Nominal Types
declare const _brand : unique symbol
type Brand <T,TBrand> = T & {[_brand]:TBrand}

type AbsolutePath = Brand<string, 'AbsolutePath'>
type RelativePath =  Brand<string,  'RelativePath'>

const absolutePath = 'path/to/file' as AbsolutePath   // casting is needed for this to work. This is not working:  const absolutePath: AbsolutePath
const relativePath = '../../file' as RelativePath     // casting is needed for this to work. This is not working:  const relativePath: RelativePath

const acceptsAbsolutePath = (path:AbsolutePath) =>path
// acceptsAbsolutePath(relativePath)    // This will finally throw error