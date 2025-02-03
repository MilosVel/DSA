1. yarn --init -y (ovim se kreira package.json)
2. yarn add typescript ts-node -D
3. npx tsc --init
4. yarn add @types/node --save-dev
5. (nzm da li treba da se doda types:["node"] i zbog cega se dodaje lib) U tsconfig.json sam dodao:  
    "lib": ["ES2015", "DOM"],
   "types": ["node"],
6. npx ts-node index.ts (pokretanje odredjenog fajla)

Kada u package.json imamo: "type": "module", onda moramo koristi komandu:

- node --loader ts-node/esm src/index.ts

Ako u package.json nemamo: "type": "module", onda koristimo:

- npx ts-node src/index.ts
