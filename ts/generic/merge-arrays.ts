
// // import { merge } from "lodash";
// import merge from 'lodash.merge';

// export function mergeArraysByKeys<T1, T2>(
//     array1: T1[],
//     array2: T2[],
//     key1: keyof T1,
//     key2: keyof T2,
//   ): (T1 & T2)[] {
//     const map = new Map<number, T1 & T2>();

//     array1.forEach((item) => {
//       const key = item[key1];
//       if (typeof key === 'number') {
//         map.set(key, structuredClone(item) as T1 & T2);
//       }
//     });

//     array2.forEach((item) => {
//       const key = item[key2];
//       if (typeof key === 'number') {
//         const existing = map.get(key);
//         if (existing) {
//           map.set(key, merge(structuredClone(existing), structuredClone(item)));
//         } else {
//           map.set(key, structuredClone(item) as T1 & T2);
//         }
//       }
//     });

//     return Array.from(map.values());
//   }




// const users = [
//     { id: 1, name: "Alice", age: 25 },
//     { id: 2, name: "Bob", age: 30 },
//   ];

//   const orders = [
//     { userId: 1, orderTotal: 100 },
//     { userId: 2, orderTotal: 150 },
//     { userId: 3, orderTotal: 200 }, // This user does not exist in `users`
//   ];

//   const mergedData = mergeArraysByKeys(users, orders, "id", "userId");

//   console.log(mergedData);

// //   [
// //     { id: 1, name: 'Alice', age: 25, userId: 1, orderTotal: 100 },
// //     { id: 2, name: 'Bob', age: 30, userId: 2, orderTotal: 150 },
// //     { userId: 3, orderTotal: 200 }
// //   ]


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////    Verzija 2
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

import merge from 'lodash/merge';

export function mergeArraysByKeys<T1, T2>(
  array1: T1[],
  array2: T2[],
  key1: keyof T1,
  key2: keyof T2,
): (T1 & T2)[] {
  const map = new Map<number, T1 & T2>();

  array1.forEach((item) => {
    const key = item[key1];
    if (typeof key === 'number') {
      map.set(key, structuredClone(item) as T1 & T2);
    }
  });

  array2.forEach((item) => {
    const key = item[key2];
    if (typeof key === 'number') {
      const existing = map.get(key);
      if (existing) {
        map.set(key, merge(structuredClone(existing), structuredClone(item)));
      } else {
        map.set(key, structuredClone(item) as T1 & T2);
      }
    }
  });

  return Array.from(map.values());
}

// Example Data
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const orders = [
  { userId: 1, orderTotal: 100 },
  { userId: 2, orderTotal: 150 },
  { userId: 3, orderTotal: 200 }, // This user does not exist in `users`
];

const mergedData = mergeArraysByKeys(users, orders, "id", "userId");

console.log(mergedData);


// [
//     { id: 1, name: 'Alice', age: 25, userId: 1, orderTotal: 100 },
//     { id: 2, name: 'Bob', age: 30, userId: 2, orderTotal: 150 },
//     { userId: 3, orderTotal: 200 }
// ]