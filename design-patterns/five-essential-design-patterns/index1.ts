// /////////        inMemory DB          ///////////////
// /////////        inMemory DB          ///////////////
// /////////        inMemory DB          ///////////////
// /////////        inMemory DB          ///////////////

// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;
// }

// class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
//     private db: Record<string, T> = {};

//     public set(newValue: T): void {
//         this.db[newValue.id] = newValue
//     }
//     public get(id: string): T | undefined {
//         return this.db[id];
//     }
// }

// const pokemonDB = new InMemoryDatabase<Pokemon>()

// pokemonDB.set({
//     id: 'Rendzer',
//     attack: 50,
//     defense: 10
// })

// console.log(pokemonDB.get('Rendzer'))


// /////////////////----------             Factory pattern        ---------------////////////
// /////////////////----------             Factory pattern        ---------------////////////
// /////////////////----------             Factory pattern        ---------------////////////
// /////////////////----------             Factory pattern        ---------------////////////
// /////////////////----------             Factory pattern        ---------------////////////


// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;
// }


// function createDatabase<T extends BaseRecord>() {
//     class InMemoryDatabase implements Database<T> {
//         private db: Record<string, T> = {};

//         public set(newValue: T): void {
//             this.db[newValue.id] = newValue
//         }
//         public get(id: string): T | undefined {
//             return this.db[id];
//         }
//     }
//     return InMemoryDatabase
// }

// const PokemonDB = createDatabase<Pokemon>()
// const pokemonDB = new PokemonDB()

// pokemonDB.set({
//     id: 'Rendzer',
//     attack: 50,
//     defense: 10
// })

// console.log(pokemonDB.get('Rendzer'))


// /////////////////----------             Singleton pattern        ---------------////////////
// /////////////////----------             Singleton pattern        ---------------////////////
// /////////////////----------             Singleton pattern        ---------------////////////
// /////////////////----------             Singleton pattern        ---------------////////////
// /////////////////----------             Singleton pattern        ---------------////////////


// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;
// }


// function createDatabase<T extends BaseRecord>() {
//     class InMemoryDatabase implements Database<T> {
//         private db: Record<string, T> = {};

//         public static instance: InMemoryDatabase = new InMemoryDatabase()

//         private constructor() { }

//         public set(newValue: T): void {
//             this.db[newValue.id] = newValue
//         }
//         public get(id: string): T | undefined {
//             return this.db[id];
//         }
//     }
//     return InMemoryDatabase
// }

// const PokemonDB = createDatabase<Pokemon>()
// const PokemonDB1 = createDatabase<Pokemon>()


// console.log('0  =>  ', PokemonDB)

// PokemonDB.instance.set({
//     id: 'Rendzer1',
//     attack: 51,
//     defense: 11
// })

// console.log('1  =>  ', PokemonDB.instance)


// PokemonDB.instance.set({
//     id: 'Rendzer2',
//     attack: 52,
//     defense: 12
// })

// console.log('2  =>  ', PokemonDB.instance)


// PokemonDB1.instance.set({
//     id: 'Rendzer3',
//     attack: 53,
//     defense: 13
// })
// console.log('3  =>  ', PokemonDB.instance)
// console.log('3  1  =>  ', PokemonDB1.instance)

// console.log(PokemonDB.instance.get('Rendzer'))


// // ///////////////////----------             Observer pattern        ---------------////////////
// // ///////////////////----------             Observer pattern        ---------------////////////
// // ///////////////////----------             Observer pattern        ---------------////////////
// // ///////////////////----------             Observer pattern        ---------------////////////
// // ///////////////////----------             Observer pattern        ---------------////////////


// //Observer
// type Listener<EventType> = (ev: EventType) => void;

// function createObserver<EventType>(): {
//     subscribe: (listener: Listener<EventType>) => () => void; // subscribe ce primati listener (taj listener ce biti tipa Listener<EventType>) i subscribe ce returnovati funkciju koja ce sa svoje strane returnovati void
//     publish: (event: EventType) => void;
// } {
//     let listeners: Listener<EventType>[] = [];

//     return {
//         subscribe: (listener: Listener<EventType>): (() => void) => {
//             listeners.push(listener);
//             return () => {
//                 // listeners = listeners.filter((l) => l !== listener);
//                 listeners = [] // PROBATI OVO OBAVEZNO umesto gornje originalne linije koda
//             };
//         },
//         publish: (event: EventType) => {
//             console.log(listeners.length, 'Duzina listenera', ' a event je ', event)
//             listeners.forEach((l, i) => { // ovo dobro pokazuje koliko niz listeners ima funkcija u sebi
//                 console.log('Listener je :', l, 'i njegov indeks je ', i)
//                 return listeners[0](event) // OBRATITI PAZNJU NA OVO
//                 // return l(event)
//             });

//             // listeners.forEach((l) => l(event)); // Ovo je originalni kod za ovaj medod publish

//         },
//     };
// }


// interface BeforeSetEvent<T> {
//     value: T;
//     newValue: T;
// }

// interface AfterSetEvent<T> {
//     value: T;
// }


// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;

//     // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
//     onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

// }


// function createDatabase<T extends BaseRecord>() {
//     class InMemoryDatabase implements Database<T> {
//         private db: Record<string, T> = {};

//         public static instance: InMemoryDatabase = new InMemoryDatabase()

//         // private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
//         private afterAddListeners = createObserver<AfterSetEvent<T>>();


//         private constructor() { }


//         public set(newValue: T): void {
//             // this.beforeAddListeners.publish({
//             //     newValue,
//             //     value: this.db[newValue.id],
//             // });

//             this.db[newValue.id] = newValue;

//             this.afterAddListeners.publish({
//                 value: newValue,
//             });
//         }


//         public get(id: string): T | undefined {
//             return this.db[id];
//         }


//         // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
//         //     return this.beforeAddListeners.subscribe(listener);
//         // }
//         onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
//             return this.afterAddListeners.subscribe(listener);
//         }


//     }
//     return InMemoryDatabase
// }

// const PokemonDB = createDatabase<Pokemon>()

// const unsucribe = PokemonDB.instance.onAfterAdd(({ value }) => {
//     let newValue = { ...value, properti: 'RADIIIIIIIIIII' }
//     console.log(newValue)
// })

// PokemonDB.instance.set({
//     id: 'Rendzer1',
//     attack: 51,
//     defense: 11
// })

// unsucribe()

// PokemonDB.instance.set({
//     id: 'Rendzer2',
//     attack: 52,
//     defense: 12
// })


///////////////////----------             Observer pattern  ceo      ---------------////////////
///////////////////----------             Observer pattern  ceo      ---------------////////////
///////////////////----------             Observer pattern  ceo      ---------------////////////
///////////////////----------             Observer pattern  ceo      ---------------////////////
///////////////////----------             Observer pattern  ceo      ---------------////////////



// // Observer
// type Listener<EventType> = (ev: EventType) => void;

// function createObserver<EventType>(): {
//     subscribe: (listener: Listener<EventType>) => () => void; // subscribe ce primati listener (taj listener ce biti tipa Listener<EventType>) i subscribe ce returnovati funkciju koja ce sa svoje strane returnovati void
//     publish: (event: EventType) => void;
// } {
//     let listeners: Listener<EventType>[] = [];

//     return {
//         subscribe: (listener: Listener<EventType>): (() => void) => {
//             listeners.push(listener);
//             return () => {
//                 // listeners = listeners.filter((l) => l !== listener);
//                 listeners = [] // PROBATI OVO OBAVEZNO umesto gornje originalne linije koda
//             };
//         },
//         publish: (event: EventType) => {

//             listeners.forEach((l, i) => { // ovo dobro pokazuje koliko niz listeners ima funkcija u sebi
//                 console.log('Listener je :', l, 'i njegov indeks je ', i, 'a listeners[i] je : ', listeners[0])
//                 return listeners[0](event)
//                 // return l(event)
//             });


//             // listeners.forEach((l) => l(event)); // Ovo je originalni kod za ovaj medod publish

//         },
//     };
// }


// interface BeforeSetEvent<T> {
//     value: T;
//     newValue: T;
// }

// interface AfterSetEvent<T> {
//     value: T;
// }


// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;

//     onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
//     onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

// }


// function createDatabase<T extends BaseRecord>() {
//     class InMemoryDatabase implements Database<T> {
//         private db: Record<string, T> = {};

//         public static instance: InMemoryDatabase = new InMemoryDatabase()

//         private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
//         private afterAddListeners = createObserver<AfterSetEvent<T>>();


//         private constructor() { }


//         public set(newValue: T): void {
//             this.beforeAddListeners.publish({
//                 newValue,
//                 value: this.db[newValue.id],
//             });

//             this.db[newValue.id] = newValue;

//             this.afterAddListeners.publish({
//                 value: newValue,
//             });
//         }


//         public get(id: string): T | undefined {
//             return this.db[id];
//         }


//         onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
//             return this.beforeAddListeners.subscribe(listener);
//         }
//         onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
//             return this.afterAddListeners.subscribe(listener);
//         }


//     }
//     return InMemoryDatabase
// }

// const PokemonDB = createDatabase<Pokemon>()

// const unsucribe = PokemonDB.instance.onAfterAdd(({ value }) => {
//     console.log(value)
// })

// PokemonDB.instance.set({
//     id: 'Rendzer1',
//     attack: 51,
//     defense: 11
// })

// unsucribe()

// PokemonDB.instance.set({
//     id: 'Rendzer2',
//     attack: 52,
//     defense: 12
// })




///////////////////----------             Visitor and Strategy pattern        ---------------////////////
///////////////////----------             Visitor and Strategy pattern        ---------------////////////
///////////////////----------             Visitor and Strategy pattern        ---------------////////////
///////////////////----------             Visitor and Strategy pattern        ---------------////////////
///////////////////----------             Visitor and Strategy pattern        ---------------////////////




// type Listener<EventType> = (ev: EventType) => void;

// function createObserver<EventType>(): {
//     subscribe: (listener: Listener<EventType>) => () => void; // subscribe ce primati listener (taj listener ce biti tipa Listener<EventType>) i subscribe ce returnovati funkciju koja ce sa svoje strane returnovati void
//     publish: (event: EventType) => void;
// } {
//     let listeners: Listener<EventType>[] = [];

//     return {
//         subscribe: (listener: Listener<EventType>): (() => void) => {
//             listeners.push(listener);
//             return () => {
//                 // listeners = listeners.filter((l) => l !== listener);
//                 listeners = [] // PROBATI OVO OBAVEZNO umesto gornje originalne linije koda
//             };
//         },
//         publish: (event: EventType) => {
//             // console.log(listeners.length, 'Duzina listenera')
//             listeners.forEach((l, i) => { // ovo dobro pokazuje koliko niz listeners ima funkcija u sebi
//                 console.log('Listener je :', l, 'i njegov indeks je ', i)
//                 return listeners[0](event) // OBRATITI PAZNJU NA OVO
//                 // return l(event)
//             });

//             // listeners.forEach((l) => l(event)); // Ovo je originalni kod za ovaj medod publish

//         },
//     };
// }


// interface BeforeSetEvent<T> {
//     value: T;
//     newValue: T;
// }

// interface AfterSetEvent<T> {
//     value: T;
// }


// interface Pokemon {
//     id: string;
//     attack: number;
//     defense: number;
// }

// interface BaseRecord {
//     id: string;
// }

// interface Database<T extends BaseRecord> {
//     set(newValue: T): void;
//     get(id: string): T | undefined;

//     // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
//     onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

//     visit(visitor: (item: T) => void): void; // vizitor ce primati vunkciju koja ce returnovati void i i sam vizitor ce returnovati void

//     selectBest(scoreStrategy: (item: T) => number): T | undefined;

// }


// function createDatabase<T extends BaseRecord>() {
//     class InMemoryDatabase implements Database<T> {
//         private db: Record<string, T> = {};

//         public static instance: InMemoryDatabase = new InMemoryDatabase()

//         // private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
//         private afterAddListeners = createObserver<AfterSetEvent<T>>();


//         private constructor() { }


//         public set(newValue: T): void {
//             // this.beforeAddListeners.publish({
//             //     newValue,
//             //     value: this.db[newValue.id],
//             // });

//             this.db[newValue.id] = newValue;

//             this.afterAddListeners.publish({
//                 value: newValue,
//             });
//         }


//         public get(id: string): T | undefined {
//             return this.db[id];
//         }


//         // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
//         //     return this.beforeAddListeners.subscribe(listener);
//         // }
//         onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
//             return this.afterAddListeners.subscribe(listener);
//         }

//         // Vistor
//         visit(visitor: (item: T) => void): void {
//             // console.log(Object.values(this.db))
//             Object.values(this.db).forEach(visitor);
//         }


//         // Strategy
//         selectBest(scoreStrategy: (item: T) => number): T | undefined {
//             const found: {
//                 max: number;
//                 item: T | undefined;
//             } = {
//                 max: 3,
//                 item: undefined,
//             };

//             Object.values(this.db).reduce((f, item, i, niz) => {
//                 // console.log('Za i ', i, 'Item je ', item, 'a f je ', f)
//                 const score = scoreStrategy(item);
//                 if (score >= f.max) { // Jako bitno je sto je ovce >= i zbog toga ce se u slucaju da dva pokemona imaju isti attack vratiti poslednji pokemon. Kada bi ovde bilo samo > vratio bi se prvi pokemon koji ima najveci attak
//                     f.max = score;
//                     f.item = item;
//                 }
//                 return f; // jako bitan return
//             }, found);

//             return found.item;
//         }

//     }
//     return InMemoryDatabase
// }

// const PokemonDB = createDatabase<Pokemon>()

// const unsucribe = PokemonDB.instance.onAfterAdd(({ value }) => {
//     console.log(value)
// })

// PokemonDB.instance.set({
//     id: 'Rendzer1',
//     attack: 51,
//     defense: 15
// })

// unsucribe()

// PokemonDB.instance.set({
//     id: 'Rendzer2',
//     attack: 52,
//     defense: 12
// })
// PokemonDB.instance.set({
//     id: 'Rendzer3',
//     attack: 52,
//     defense: 12
// })


// PokemonDB.instance.visit((item) => {
//     console.log('Item id iz vizitoraj je : ', item.id, '. Ceo item je: ', item);
// });


// const bestDefensive = PokemonDB.instance.selectBest(({ defense }) => defense);
// const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);

// console.log(`Best defense = ${bestDefensive?.id}`);
// console.log(`Best attack = ${bestAttack?.id}`);







/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////
/////////////////////       ---------------     Adapter  pattern  i svi ostali    -------------    ///////////////






import { RecordHandler, loader } from "./loader";

type Listener<EventType> = (ev: EventType) => void;

function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void; // subscribe ce primati listener (taj listener ce biti tipa Listener<EventType>) i subscribe ce returnovati funkciju koja ce sa svoje strane returnovati void
    publish: (event: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];

    return {
        subscribe: (listener: Listener<EventType>): (() => void) => {
            listeners.push(listener);
            return () => {
                // listeners = listeners.filter((l) => l !== listener);
                listeners = [] // PROBATI OVO OBAVEZNO umesto gornje originalne linije koda
            };
        },
        publish: (event: EventType) => {
            // console.log(listeners.length, 'Duzina listenera')
            listeners.forEach((l, i) => { // ovo dobro pokazuje koliko niz listeners ima funkcija u sebi
                console.log('Listener je :', l, 'i njegov indeks je ', i)
                return listeners[0](event) // OBRATITI PAZNJU NA OVO
                // return l(event)
            });

            // listeners.forEach((l) => l(event)); // Ovo je originalni kod za ovaj medod publish

        },
    };
}


interface BeforeSetEvent<T> {
    value: T;
    newValue: T;
}

interface AfterSetEvent<T> {
    value: T;
}


interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;
    get(id: string): T | undefined;

    // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

    visit(visitor: (item: T) => void): void; // vizitor ce primati vunkciju koja ce returnovati void i i sam vizitor ce returnovati void

    selectBest(scoreStrategy: (item: T) => number): T | undefined;

}


function createDatabase<T extends BaseRecord>() {
    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {};

        public static instance: InMemoryDatabase = new InMemoryDatabase()

        // private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
        private afterAddListeners = createObserver<AfterSetEvent<T>>();


        private constructor() { }


        public set(newValue: T): void {
            // this.beforeAddListeners.publish({
            //     newValue,
            //     value: this.db[newValue.id],
            // });

            this.db[newValue.id] = newValue;

            this.afterAddListeners.publish({
                value: newValue,
            });
        }


        public get(id: string): T | undefined {
            return this.db[id];
        }


        // onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
        //     return this.beforeAddListeners.subscribe(listener);
        // }
        onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
            return this.afterAddListeners.subscribe(listener);
        }

        // Vistor
        visit(visitor: (item: T) => void): void {
            // console.log(Object.values(this.db))
            Object.values(this.db).forEach(visitor);
        }


        // Strategy
        selectBest(scoreStrategy: (item: T) => number): T | undefined {
            const found: {
                max: number;
                item: T | undefined;
            } = {
                max: 3,
                item: undefined,
            };

            Object.values(this.db).reduce((f, item, i, niz) => {
                // console.log('Za i ', i, 'Item je ', item, 'a f je ', f)
                const score = scoreStrategy(item);
                if (score >= f.max) { // Jako bitno je sto je ovce >= i zbog toga ce se u slucaju da dva pokemona imaju isti attack vratiti poslednji pokemon. Kada bi ovde bilo samo > vratio bi se prvi pokemon koji ima najveci attak
                    f.max = score;
                    f.item = item;
                }
                return f; // jako bitan return
            }, found);

            return found.item;
        }

    }
    return InMemoryDatabase
}

const PokemonDB = createDatabase<Pokemon>()


// Adapter pattern
class PokemonDBAdapter implements RecordHandler<Pokemon> { // Ova klasa bi erovatno trebala da koristi dependency injection
    addRecord(record: Pokemon) {
        PokemonDB.instance.set(record);
    }
}


const unsucribe = PokemonDB.instance.onAfterAdd(({ value }) => {
    console.log('Iz observer (subscription) pattern-a :  ', value)
})
loader("./data.json", new PokemonDBAdapter());



PokemonDB.instance.set({
    id: 'Rendzer1',
    attack: 51,
    defense: 15
})

unsucribe()

PokemonDB.instance.set({
    id: 'Rendzer2',
    attack: 52,
    defense: 12
})
PokemonDB.instance.set({
    id: 'Rendzer3',
    attack: 52,
    defense: 12
})


PokemonDB.instance.visit((item) => {
    console.log('Item id iz vizitoraj je : ', item.id, '. Ceo item je: ', item);
});


const bestDefensive = PokemonDB.instance.selectBest(({ defense }) => defense);
const bestAttack = PokemonDB.instance.selectBest(({ attack }) => attack);

console.log(`Best defense strategy pattern = ${bestDefensive?.id}`);
console.log(`Best attack strategy pattern  = ${bestAttack?.id}`);






















