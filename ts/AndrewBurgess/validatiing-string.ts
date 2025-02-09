type NoEmptyString = {
    __brand: 'Metric names should not be an empty string'
}


type DisallowedChars = '\n' | ' ' | '"' | "'" | "-"

//// Varijanta 1
// type MetricName<T extends string> = T

//// Varijanta 2
// type MetricName<T extends string> = T extends `${infer _a}${DisallowedChars}${infer _b}` ? never : T

////  Varijanta 3
// type MetricName<T extends string> = T extends `${infer _a}${DisallowedChars}${infer _b}` ? never :
//     T extends Lowercase<T> ? T : never

//// varijanta 4
type MetricName<T extends string> = T extends `${infer _a}${DisallowedChars}${infer _b}` ? never :
    T extends Lowercase<T> ? T extends '' ? NoEmptyString : T : never


function incrementMetric<T extends string>(_metric: MetricName<T>) { }

incrementMetric("hello")
incrementMetric("he'llo")
incrementMetric("helloWorld")
incrementMetric(`hello world`)
incrementMetric("")
