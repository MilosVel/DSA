
function maybe<T>(fnOrP: () => T ): T | undefined  
function maybe<T>(fnOrP: Promise<T>):  Promise<T | undefined> 

function maybe<T>(fnOrP: (() => T) | Promise<T>): T | undefined | Promise<T | undefined> {

    if (typeof fnOrP === 'function') {
        try {
            return fnOrP();
        } catch {
            return undefined;
        }
    }

    return fnOrP.catch(() => undefined);
}

const x = maybe(() => 'Hello'); // Here we have to exclude Promise return type. We achieve this with frst two lines of code

(async function () {
    const y = await maybe(Promise.resolve('Typescript'));
    console.log(y);
});
