////////////////     TIP 3 Prettify

type ComplexType = {
    a: string;
    b: string;
} & Omit<{
    c: boolean;
} & Record<'d', number[]>, 'c'>


type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}   // ovo je uobicajeni nastavak za Prettify & {}


type ShowMe = Prettify<ComplexType>

// type ShowMe = {
//   a: string;
//   b: string;
//   d: number[];
// }

////////////////////////////////////////////////////////

type ToDiscoUnion<T extends Record<string, object>
> = {
  [K in keyof T]: Prettify<
    {
      type: K;
    } & T[K]
  >;
}[keyof T];

type State = ToDiscoUnion<{
  loading: {};
  error: {
    message: string;
  };
  complete: {
    name: string;
  };
}>;

// type State =
//   | {
//       type: 'loading';
//     }
//   | {
//       type: 'error';
//       message: string;
//     }
//   | {
//       type: 'complete';
//       name: string;
//     };
