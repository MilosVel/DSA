// Helper Types
type BaseTable = {
    [colName: string]: string | number | boolean;
};

type Columns<Tables extends { [tableName: string]: BaseTable }> = {
    [K in keyof Tables]: K extends string ? (keyof Tables[K] extends string ? `${K}.${keyof Tables[K]}` : never) : never;
}[keyof Tables];

type Flat<Tables extends { [tableName: string]: BaseTable }> = {
    [K in Columns<Tables>]: Tables[K extends `${infer T}.${infer _}` ? T : never][K extends `${infer _}.${infer C}`
    ? C
    : never];
};



class QueryBuilder<Tables extends { [tableName: string]: BaseTable }> {
    table<N extends string, T extends BaseTable>() {
        return new QueryBuilder<Tables & { [X in N]: T }>(
            /* copy state over here */
        );
    }

    select(...cols: Columns<Tables>[]) {
        // implement here
        return this;
    }

    where<K extends Columns<Tables>>(col: K, value: Flat<Tables>[K]) {
        // implement here
        return this;
    }
}



export const q = new QueryBuilder<{ user: { id: number; name: string } }>();

q.select("user.id", "user.name")
    .where("user.name", "andrew")
    .where("user.id", 3);




q.select("user.id", "user.age")
//                   ^^^^^^^^
// Argument of type '"user.age"' is not assignable
//  to parameter of type '"user.id" | "user.name"'.


q.where("user.name", new Date())
//                   ^^^^^^^^^^
// Argument of type 'Date' is not assignable
//  to parameter of type 'string'.


q
    .select("user.id", "user.name")
    .table<"widget", { widgetId: string; userId: number }>()
    .select("widget.widgetId", "widget.userId")
    .where("widget.widgetId", 12);
//                          ^^
// Argument of type 'number' is not assignable
//  to parameter of type 'string'.