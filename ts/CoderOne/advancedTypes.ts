type ReadOnlyProps<T> = {
    readonly [P in keyof T]: T[P]
}

interface Props {
    title: string;
    content: string
}

type readOnlyProps = ReadOnlyProps<Props>

const tryModifyFn = (readOnlyProps: readOnlyProps) => {
    // readOnlyProps.title = 'New title ' ///   Cannot assign to 'title' because it is a read-only property.
}



////////////////////////
////////////////////////
////////////////////////
////////////////////////


interface Person {
    name: string;
    age: number;
    job: string
}

const knownPerson: Person = {
    name: 'Jonn',
    age: 20,
    job: 'Web developer'
}

type Nullable<T> = { [K in keyof T]: T[K] | null }

type UnknownPersonT = Nullable<Person>

const unknownPersion: UnknownPersonT = {
    name: null,
    age: null,
    job: null
}


type UnknownUnemployedPersonT = Nullable <Omit<Person,'job'>>

const unknownUnemployedPerson: UnknownUnemployedPersonT = {
    name: 'John',
    age: null,
    // We dont need job here and all properties can be nullable
};


