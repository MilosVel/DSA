// npx tsx ts/decorators/class.ts

function logClass(_constructor: Function) {
  console.log(`Class ${(_constructor as any).name} was defined at ${new Date().toISOString()}`);
}

@logClass
class UserService {
  getUsers() {
    return ['Alice', 'Bob', 'Charlie'];
  }
}



/////////////////////////////////////////////////////  Version decorator

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



/////////////////////////////////////////////////////

// Sealed Class Decorator

function sealed(constructor: Function) {
  console.log(`Sealing ${constructor.name}...`);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}
