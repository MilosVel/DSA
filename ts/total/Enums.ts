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
type LogLevelString = ObjectValues<typeof LogLevelObj> // type LogLevelString = "DEBUG" | "WARNING" | "ERROR"

function logFn(message:string , level:LogLevelString){}

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
    ERROR : 'ERROR'
} as const // mora se koristiti as const

type keySedondWay =  typeof Log [keyof typeof Log] // type keySedondWay = "WARNING" | "ERROR" | "DEBUG"


type key = keyof typeof Log // type key = "DEBUG" | "WARNING" | "ERROR"

function fnLog (message: string , key:key) {
console.log(`${Log[key]} : ${message}`);
}

fnLog('Hey', 'DEBUG') // radi intellisence