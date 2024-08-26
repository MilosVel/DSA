type FormResponse = {
    id:string,
    type:'checkbox',
    value:boolean,
} |
{
    id:string,
    type:"text",
    value:string,
}

type RenderedFormResponse = Omit<FormResponse, 'id'>


type DistributiveOmit <T, K extends string | number | symbol> = T extends T ? Omit<T,K> : never
type DistributiveRenderedFormResponse = DistributiveOmit<FormResponse, 'id'>




///////////


type ASimpleUnion = "checkbox" | undefined | "text" | number

type A1 = Array<ASimpleUnion>
// the same
type A2 = Array<"checkbox" | undefined | "text" | number >

type A3 = Array<string> | Array<number>

type A4 = ASimpleUnion extends string ? ASimpleUnion  : never // not all elements in ASimpleUnion are strings

type OnlyStrings <T> =  T extends string ? T : never

type A5  = OnlyStrings<ASimpleUnion> 

type ToArray <T> = T extends T ? Array<T> : never
type A6 = ToArray<ASimpleUnion>

type ToArrayASimpeUnion <T> = [T] extends [T] ? Array<T> : never
type A7 = ToArrayASimpeUnion<ASimpleUnion>
