import { z } from 'zod'



// //   //    TIP Number 1


type MyGenericType<TData> = {
    data: TData
}

type Example = MyGenericType<string>


// //   //    TIP Number 2


const makeFetch = <TData>(url: string): Promise<TData> => {
    return fetch('/api/endpoints').then(res => res.json())
}

makeFetch<{ firstName: string, lastName: string }>('/api/endpoints').then(res => {
    console.log(res);
})

// //   //    TIP Number 3

const set = new Set<string>()

// set.add(3)  // ne moze se proslediti broj
set.add('Milos')




//  // //    TIP Number 4

const addIdToObject = <TObj>(obj: TObj) => {
    return {
        ...obj,
        id: "123"
    }
}

const resutl = addIdToObject({
    firstName: 'Milos',
    lastName: 'Velickovic'
})


console.log(resutl);




//    //   //  TIP  Number 5

type GetRetunrType<T extends (...args) => unknown> = ReturnType<T>
type Result1 = GetRetunrType<
    () => {
        firstNname: string,
        lastName: string,
        age: number
    }>


type GetPromiseRetunrType<T extends (...args) => unknown> = Awaited<ReturnType<T>>
type Result = GetPromiseRetunrType<
    () => Promise<{
        firstNname: string,
        lastName: string
    }>>




// // TIP Number  6

const getKeyWithHighestValue = <TObj extends Record<string, number>>(
    obj: TObj
): {
    key: keyof TObj;
    value: number
} => {

    const keys = Object.keys(obj) as Array<keyof TObj>

    let highestKey: keyof TObj = keys[0]
    let highestValue = obj[highestKey]

    for (const key of keys) {
        if (obj[key] > highestValue) {
            highestKey = key
            highestValue = obj[key]
        }
    }


    return {
        key: highestKey,
        value: highestValue
    }

}



const rezultat = getKeyWithHighestValue({
    a: 1,
    b: 2,
    c: 3
})

console.log(rezultat);





///////////      TIP Number 7

const typesObjectKeys = <TObj extends {}>(obj: TObj) => {
    return Object.keys(obj) as Array<keyof TObj>
}

const kljucevi = typesObjectKeys({
    name: 'Milos',
    age: 32
})




///////////////////   Tip Number 8




// const getValue = <TObj>(obj: TObj, key: keyof TObj) => {     //   Donja varijanta je mnogo bolja
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
    if (key === 'bad') {
        throw new Error('Key is not valid')
    }

    return obj[key]
}

const value = getValue(
    {
        a: 1,
        b: "some-string",
        c: true
    },
    'c'
)




///////////////////   Tip Number 9



const createSet = <T = string> () => {
    return new Set<T>()
}


const nummerSet = createSet<number>()
const stringSet = createSet<string>()

const defaultStringSet = createSet()



////////////////   Tip Number 10


const makeZodSafeFetch = <TData>(
    url: string,
    schema: z.Schema<TData>
): Promise<TData> => {
    return fetch(url).
        then((res) => res.json()).
        then((res) => {
            return schema.parse(res)
        })
}


const result = makeZodSafeFetch('/api/endpoints', z.object({
    firstName: z.string(),
    lastName: z.string(),
    id: z.number()
})).then(res => {
    console.log(res)
    return res
})

console.log(result);

