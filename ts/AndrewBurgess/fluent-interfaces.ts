class QueryBuilder {
    private fields: string[] = [];
    private wheres: Record<string, string> = {};
    private table: string = '';

    select(...columns: string[]) {
        this.fields = columns;
        return this;
    }

    from(table: string) {
        this.table = table;
        return this;
    }

    where(column: string, value: string) {
        this.wheres[column] = value;
        return this;
    }

    build() {
        return `SELECT ${this.fields.join(", ")} FROM ${this.table} WHERE ${Object.entries(this.wheres)
            .map(([k, v]) => `${k} = ${v}`)
            .join(" AND ")};`;
    }
}


const query = new QueryBuilder()
    .select("name", "email")
    .from("users")
    .where("id", "1")
    .build();

// console.log(query);

/////////////////////////////////////////////
/////////////////////////////////////////////
// /////////////////////////////////////////////

// function pipe<A, B>(fn: (a: A) => B) {
//     console.log('ROOT');
//     function run(a: A) {
//         console.log('Runnning', a);
//         return fn(a);
//     }

//     run.pipe = <C>(fn2: (b: B) => C) => {
//         console.log('piping****')
//         return pipe((a: A) =>
//             fn2(fn(a))
//         );

//     }

//     return run;
// }

// const stringToDateAndTime = pipe(Date.parse)
//     .pipe((n) => new Date(n))
//     .pipe((d) => d.toISOString())
//     .pipe((s) => s.split("T"))
//     .pipe((a) => ({ date: a[0], time: a[1] }));

// const result = stringToDateAndTime("Jan 1, 2024");
// result = { date: "2024-01-01", time: "05:00:00.000Z" }




// console.log(Date.parse("2025-01-01T00:00:00Z"))

//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////

function pipe<A, B>(fn: (a: A) => B) {
    console.log("ROOT");
    function run(a: A) {
        console.log("Running", a);
        return fn(a);
    }

    run.pipe = <C>(fn2: (b: B) => C) => {
        console.log("piping****");
        return pipe((a: A) => fn2(fn(a)));
    };

    return run;
}


const processFullName = pipe((fullName: string) => fullName.trim()) 
    .pipe((name) => name.toUpperCase())
    .pipe((name) => name.split(" ")) 
    .pipe((parts) => ({
        firstName: parts[0],
        lastName: parts.length > 1 ? parts[1] : "",
    }))
    .pipe((obj) => `${obj.firstName} ${obj.lastName}`.trim()); 


const result = processFullName("   John   Doe   ");
console.log(result);
