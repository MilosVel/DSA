// type Invoice = {
//     product: string;
//     total: number
// }

// type InvoiceBuilderInput = {
//     product: string;
//     amount: number
//     cost: number
//     taxRate: number
// }

// export class Builder<T extends Partial<InvoiceBuilderInput>> {
//     #actual: T;

//     static create(product: string) {
//         return new Builder({ product })
//     }

//     private constructor(actual: T) {
//         this.#actual = actual;
//     }

//     setAmount(amount: number) {
//         return new Builder({ ...this.#actual, amount })
//     }

//     setCost(cost: number) {
//         return new Builder({ ...this.#actual, cost })
//     }


//     setTaxRate(taxRate: number) {
//         return new Builder({ ...this.#actual, taxRate })
//     }

//     build(): Invoice {
//         const a = this.#actual as InvoiceBuilderInput // probati da se zakomentarisae  casting
//         return {
//             product: a.product,
//             total: a.amount * a.cost * (1 + a.taxRate)
//         }
//     }
// }


// const i  = Builder.create('widget').setCost(10).setAmount(2).build() // nismo koristili metod setTaxRate


/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////

// type Invoice = {
//     product: string;
//     total: number
// }

// type InvoiceBuilderInput = {
//     product: string;
//     amount: number
//     cost: number
//     taxRate: number
// }

// class Builder<T extends Partial<InvoiceBuilderInput>> {
//     #actual: T;

//     static create(product: string) {
//         return new Builder({ product })
//     }

//     private constructor(actual: T) {
//         this.#actual = actual
//     }

//     setAmount(amount: number) {
//         return new Builder({ ...this.#actual, amount })
//     }

//     setCost(cost: number) {
//         return new Builder({ ...this.#actual, cost })
//     }


//     setTaxRate(taxRate: number) {
//         return new Builder({ ...this.#actual, taxRate })
//     }

//     build(this: Builder<InvoiceBuilderInput>): Invoice {
//         const a = this.#actual
//         return {
//             product: a.product,
//             total: a.amount * a.cost * (1 + a.taxRate)
//         }
//     }
// }


// const i = Builder.create('widget').setCost(10).setAmount(2).setTaxRate(2).build() // probati da se izbaci metod setTaxRate


// console.log(i)


///////////////////////
///////////////////////
///////////////////////   description optional method
///////////////////////
///////////////////////


type Invoice = {
    // type Invoice = {
    product: string;
    total: number
}

type InvoiceBuilderInput = {
    product: string;
    amount: number
    description?: string
    cost: number
    taxRate: number
}

class Builder<T extends Partial<InvoiceBuilderInput>> {
    #actual: T;

    static create(product: string) {
        return new Builder({ product })
    }

    private constructor(actual: T) {
        console.log('Izvrsenje constructor', actual)
        this.#actual = actual
    }

    setAmount(amount: number) {
        return new Builder({ ...this.#actual, amount })
    }

    setCost(cost: number) {
        console.log('U setcost', this.#actual)
        return new Builder({ ...this.#actual, cost })
    }


    setTaxRate(taxRate: number) {
        return new Builder({ ...this.#actual, taxRate })
    }

    setDescription(description: string) {
        console.log('U deskripciji', this.#actual)
        return new Builder({ ...this.#actual, description })
    }

    build(this: Builder<InvoiceBuilderInput>): Invoice {
        const a = this.#actual
        return {
            product: a.product,
            total: a.amount * a.cost * (1 + a.taxRate)
        }
    }
}


const i = Builder.create('widget').setDescription('Description').setCost(10).setAmount(2).setTaxRate(2).build() // probati da se izbaci metod setTaxRate


console.log(i)


//////////////////////
//////////////////////
//////////////////////  Generic
//////////////////////


// type Invoice = {
//     product: string;
//     total: number
// }

// type InvoiceBuilderInput = {
//     product: string;
//     amount: number
//     description?: string
//     cost: number
//     taxRate: number
// }

// class Builder<Expected, Actual extends Partial<Expected>> {
//     #actual: Actual;

//     static create(product: string) {
//         return new Builder({ product })
//     }

//     private constructor(actual: Actual) {
//         console.log('Izvrsenje constructor')
//         this.#actual = actual
//     }

//     setAmount(amount: number) {
//         return new Builder({ ...this.#actual, amount })
//     }

//     setCost(cost: number) {
//         return new Builder({ ...this.#actual, cost })
//     }


//     setTaxRate(taxRate: number) {
//         return new Builder({ ...this.#actual, taxRate })
//     }

//     setDescription(description: string) {
//         return new Builder({ ...this.#actual, description })
//     }

//     build(this: Builder<InvoiceBuilderInput, InvoiceBuilderInput>): Invoice {
//         const a = this.#actual
//         return {
//             product: a.product,
//             total: a.amount * a.cost * (1 + a.taxRate)
//         }
//     }
// }


// const i = Builder.create('widget').setDescription('Description').setCost(10).setAmount(2).setTaxRate(2).build() // probati da se izbaci metod setTaxRate


// console.log('Invoice ', i)