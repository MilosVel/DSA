
export type AppLinkItem = {
  name: string;
  group: string;
};

export const initialSidebarLinks: AppLinkItem[] = [
  {
    name: 'Outlets',
    group: 'General',
  },
  {
    name: 'Staffing request',
    group: 'Overview',
  },
  {
    name: 'Timesheet',
    group: 'Overview',
  },
  {
    name: 'Weekly schedule',
    group: 'Overview',
  },
];

export type CommonGroupOption<T> = {
  title: string;
  data: T[];
};


export function groupBy<T, K extends keyof T>(items: T[], key: K) {
  const groups = items
    .reduce((acc, item) => {
      const groupKey = String(item[key]);
      if (!acc.has(groupKey)) {
        acc.set(groupKey, { title: groupKey, data: [] });
      }
      acc.get(groupKey)?.data.push(item);
      return acc;
    }, new Map<string, CommonGroupOption<T>>())
    .values();

  return Array.from(groups);
}


console.log(JSON.stringify(groupBy(initialSidebarLinks,'group'),null,2))


// [
//   {
//     "title": "General",
//     "data": [
//       {
//         "name": "Outlets",
//         "group": "General"
//       }
//     ]
//   },
//   {
//     "title": "Overview",
//     "data": [
//       {
//         "name": "Staffing request",
//         "group": "Overview"
//       },
//       {
//         "name": "Timesheet",
//         "group": "Overview"
//       },
//       {
//         "name": "Weekly schedule",
//         "group": "Overview"
//       }
//     ]
//   }
// ]




////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////




// const fruits = [
//     {name:"apples", quantity:300},
//     {name:"bananas", quantity:500},
//     {name:"oranges", quantity:200},
//     {name:"kiwi", quantity:150}
//   ];
  
//   function myCallback({ quantity }) {
//     return quantity > 200 ? "ok" : "low";
//   }
  
//   const result = Object.groupBy(fruits, myCallback);
  
//   console.log(result)

// //   [Object: null prototype] {
// //     ok: [
// //       { name: 'apples', quantity: 300 },
// //       { name: 'bananas', quantity: 500 }
// //     ],
// //     low: [
// //       { name: 'oranges', quantity: 200 },
// //       { name: 'kiwi', quantity: 150 }
// //     ]
// //   }