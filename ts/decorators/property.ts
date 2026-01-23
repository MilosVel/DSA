// npx tsx .\ts\decorators\property.ts

function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = () => value;
    const setter = (newVal: string) => {
      value = formatString.replace('{}', newVal);
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Greeter {
  @format('Hello, {}!')
  greeting: string;
}

const greeter = new Greeter();
greeter.greeting = 'World';
console.log(greeter.greeting);
