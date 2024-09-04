enum LogLevel {
    DEBUG = 'DEBUG',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

function log(message:string , level:LogLevel){}

log('HEY', LogLevel.DEBUG)


///////////////////////////////////////////////////   
///////////////////////////////////////////////////   Bolje resenje
///////////////////////////////////////////////////   

const LogLevelObj =  {
    DEBUG : 'DEBUG',
    WARNING : 'WARNING',
    ERROR : 'ERROR'
} as const // mora se koristiti as const


///////////////////////////////////////////////////
type ObjectValuesArray<T> = T[]
const arr: ObjectValuesArray<1> = [1,1,1,1]
///////////////////////////////////////////////////

type ObjectValues<T> = T[keyof T]
type LogLevelStringValues = ObjectValues<typeof LogLevelObj> // type LogLevelString = "DEBUG" | "WARNING" | "ERROR"  // Ovo vraca vresnosti

type ObjectKeys<T> = keyof T 
type LogLevelStringKeys = ObjectKeys<typeof LogLevelObj> // type LogLevelString = "DEBUG" | "WARNING" | "ERROR" // Ovo vraca keys

function logFn(message:string , level:LogLevelStringKeys){}

logFn('Hey','DEBUG') // radi intellisence
logFn('Hey',LogLevelObj.DEBUG)




//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////   Exercise
//////////////////////////////////////////////////
//////////////////////////////////////////////////


const Log =  {
    DEBUG : 'DEBUG',
    WARNING : 'WARNING',
    ERROR11111111111 : 'ERRORqqqqqqqqqqqqqqqq'
} as const // mora se koristiti as const

type values =  typeof Log [keyof typeof Log] // type values = "WARNING" | "ERROR" | "DEBUG"  // Ovo vraca vrednosti


type keys = keyof typeof Log // type key = "DEBUG" | "WARNING" | "ERROR" // Ovo vraca keys

function fnLog (message: string , key:keys) {
console.log(`${Log[key]} : ${message}`);
}

fnLog('Hey', 'DEBUG') // radi intellisence