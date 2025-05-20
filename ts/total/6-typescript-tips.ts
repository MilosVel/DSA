////////////////     TIP 1   (Key vs Value optional)


///////////   varijanta 1
const doThing1 = (ctx: {
    traceId?: string
}) => { }

const doAnotherThing1 = (ctx: {
    traceId?: string
}) => { }

export const mainFunction1 = (ctx: { traceId?: string }) => {
    doThing1({})

    doAnotherThing1({
        traceId: ctx.traceId
    })
}
mainFunction1({})

///////////   varijanta 2
const doThing2 = (ctx: {
    traceId: string | undefined
}) => { }

const doAnotherThing2 = (ctx: {
    traceId: string | undefined
}) => { }

export const mainFunction2 = (ctx: { traceId: string | undefined }) => {
    doThing2({ traceId: undefined })

    doAnotherThing2({
        traceId: ctx.traceId
    })
}

mainFunction2({ traceId: undefined })

///////////   varijanta 3

const doThing3 = (ctx: {
    traceId: string | undefined
}) => { }

const doAnotherThing3 = (ctx: {
    traceId: string | undefined
}) => { }

export const mainFunction3 = (ctx: { traceId?: string }) => {
    doThing3({ traceId: undefined })

    doAnotherThing3({
        traceId: ctx.traceId
    })
}

mainFunction3({})


////////////////     TIP 2   Pick, Omit, Extract, Exclude


type Album = {
    title: string
    artist: string
    releaseYear: number
    genre?: {
        parentGenre?: string
        subGenre?: string
    }
}

type AlbumData1 = Pick<Album, 'title' | 'artist'>

type AlbumData2 = Omit<Album, 'id' | 'releaseYear' | 'genre'>

type AlbumState =
    | {
        type: 'released',
        releaseYear: string
    }
    | {
        type: 'recording'
        studio: string
    }
    | {
        type: 'mixing'
        engineer: string
    }

type NonReleased = Exclude<
    AlbumState,
    { type: 'released' }    // { releaseYear: string }
>


type Example = "a" | "b" | 1 | 2

type Strings = Extract<Example, string> // type Strings = "a" | "b"
type Numbers = Extract<Example, number> // type Numbers = 1 | 2

type StringsExcluded = Exclude<Example, string> // type StringsExcluded = 1 | 2 
type NumbersExcluded = Exclude<Example, number> // type NumbersExcluded = "a" | "b"



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



////////////////     TIP 4 Lose Autocomplete


type ModelNames =
    | 'gpt4-o' | 'O3-mini' | 'claude-sonnet-3.7' | (string & {})

const model1: ModelNames = 'claude-sonnet-3.7'
const model12: ModelNames = 'New Model'



////////////////     TIP 5  Mapped types


type User = {
    id: string;
    name: string;
    age: number;
}

type ReadonlyUser = {
    readonly [K in keyof User]?: User[K]
}

type UserTransformed = {
    [K in keyof User as `get${Capitalize<K>}`]: () => User[K]
}



////////////////     TIP 6 IIMT  (imidiate index mapped type)


type Actions = {
    login: {
        username: string;
        password: string;
    };
    logout: {
        reason: string;
    };
    update: {
        id: string;
        data: unknown
    }
}

type simpleAction = Actions['login' | 'logout']
type simpleAction2 = Actions[keyof Actions]

type ActionAsDiscoUnion = {
    [K in keyof Actions]: Prettify<{
        type: K;
    } & Actions[K]>
}[keyof Actions]

