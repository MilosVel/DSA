// npx tsx ts/decorators/class.ts

function versioned(version: string) {
  return function (constructor: Function) {
    // add a version on the prototype so instances can read it
    (constructor as any).prototype.version = version;
    const original = constructor as any;
    const newConstructor: any = function (...args: any[]) {
      console.log(`Creating instance of ${original.name} v${version}`);
      return new original(...args);
    };
    newConstructor.prototype = original.prototype;
    return newConstructor;
  };
}

@versioned('1.0.0')
class ApiClient {
  fetchData() {
    console.log('Fetching data...');
  }
}

const client = new (ApiClient as any)();
console.log((client as any).version);
client.fetchData();