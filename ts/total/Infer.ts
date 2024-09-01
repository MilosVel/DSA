type Result  = boolean extends true ? 1 : 0
type Result1  = true extends boolean ? 1 : 0

const func = (check:boolean) =>{
    // return 11222
    // return '122121' 
    return '122121' // as const
}


type FuncResult = ReturnType<typeof func>

type FuncResult1 = typeof func extends (...args:any)=> infer R ? R : never



////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


type FakeReturnType<T> =  T extends (...args:any)=> infer R ? R : never // nema nikakav constrain tako da T moze da bude bilo sta
type f = FakeReturnType<typeof func>
const whatever = {}
type whateverT = FakeReturnType<typeof whatever>




////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type ReturnTypeDocumentation<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type FakeReturnType1<T> = T extends ((...args: any) => infer R extends string) ? `${R}_return type` : never
type FakeReturnTypeComplicated<T> = T extends (...args: any) => infer R ? R extends string ? `${R}_return type complicated` : never : never



type FunctionResult = FakeReturnType1<typeof func>
type FunctionResultcomplicated = FakeReturnTypeComplicated<typeof func>

type ReturnValue = ReturnTypeDocumentation<typeof func>

////////////////////////

type GetFromDeepObject<T> = T extends {
    a: {
        b: {
            c: infer C
        }
    }
} |
{
    a: {
        c: infer C
    }
}
    ? C : never



type C = GetFromDeepObject<{
    a: {
        b: {
            c: string
        }
    }
}>

