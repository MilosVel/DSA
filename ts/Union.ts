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
// type RenderedFormResponse = {
//     type: "checkbox" | "text";
//     value: string | boolean;
// }


type DistributiveOmit <T, K extends string | number | symbol> = T extends T ? Omit<T,K> : never
type DistributiveRenderedFormResponse = DistributiveOmit<FormResponse, 'id'>
// type DistributiveRenderedFormResponse = Omit<{
//     id: string;
//     type: 'checkbox';
//     value: boolean;
// }, "id"> | Omit<{
//     id: string;
//     type: "text";
//     value: string;
// }, "id">



///////////


type ASimpleUnion = "checkbox" | undefined | "text" | number

type A1 = Array<ASimpleUnion> // type A1 = ASimpleUnion[]
// the same
type A2 = Array<"checkbox" | undefined | "text" | number >

type A3 = Array<string> | Array<number>

type A4 = ASimpleUnion extends string ? ASimpleUnion  : never // type A4 = never //  not all elements in ASimpleUnion are strings

type OnlyStrings <T> =  T extends string ? T : never

type A5  = OnlyStrings<ASimpleUnion> // type A5 = "checkbox" | "text"
// the same
type A51 =  OnlyStrings< "checkbox" | undefined | "text" | number> // type A51 = "checkbox" | "text"

type ToArray <T> = T extends T ? Array<T> : never
type A6 = ToArray<ASimpleUnion> // type A6 = number[] | undefined[] | "checkbox"[] | "text"[]

type ToArrayASimpeUnion <T> = [T] extends [T] ? Array<T> : never
type A7 = ToArrayASimpeUnion<ASimpleUnion> // type A7 = ASimpleUnion[]
