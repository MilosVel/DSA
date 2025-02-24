  export type SelectOption = {
    value: string;
    label: string;
    data?: {
      image?: string;
      phone?: string;
      contact_type?: number;
    };
  };
  
  export type GroupedOption = {
    label: string;
    options: SelectOption[];
  };
  

  export function createSelectGroup<T>(
    items: T[],
    key: keyof T,
    formatItem: (item: T) => SelectOption,
  ): GroupedOption[] {
    const groups = items
      .reduce((acc, current) => {
        const groupKey = String(current[key]);
  
        const { label, value } = formatItem(current);
  
        if (!acc.has(groupKey)) {
          acc.set(groupKey, {
            label: groupKey,
            options: [],
          });
        }
  
        acc.get(groupKey)?.options.push({ label, value });
  
        return acc;
      }, new Map<string, GroupedOption>())
      .values();
  
    return Array.from(groups);
  }


  const apparels = [
    { id: 1, name: 'Sneakers', type: 'FOOTWEAR' },
    { id: 2, name: 'Shoes', type: 'FOOTWEAR' },
    { id: 3, name: 'Brown Shoes', type: 'FOOTWEAR' },
    { id: 4, name: 'T-shirt', type: 'UPPER' },
    { id: 5, name: 'Apron', type: 'UPPER' },
    { id: 6, name: 'Sweatshirt', type: 'UPPER' },
    { id: 7, name: 'Pants', type: 'LOWER' },
    { id: 8, name: 'Jeans', type: 'LOWER' },
    { id: 9, name: 'Shorts', type: 'LOWER' }
  ];

  const apperalGroups =() => {
    return createSelectGroup(apparels, 'type', (item) => ({
      label: item.name,
      value: String(item.id),
    }));
  }


  console.log(JSON.stringify(apperalGroups(), null,2));
//   [
//     {
//       "label": "FOOTWEAR",
//       "options": [
//         {
//           "label": "Sneakers",
//           "value": "1"
//         },
//         {
//           "label": "Shoes",
//           "value": "2"
//         },
//         {
//           "label": "Brown Shoes",
//           "value": "3"
//         }
//       ]
//     },
//     {
//       "label": "UPPER",
//       "options": [
//         {
//           "label": "T-shirt",
//           "value": "4"
//         },
//         {
//           "label": "Apron",
//           "value": "5"
//         },
//         {
//           "label": "Sweatshirt",
//           "value": "6"
//         }
//       ]
//     },
//     {
//       "label": "LOWER",
//       "options": [
//         {
//           "label": "Pants",
//           "value": "7"
//         },
//         {
//           "label": "Jeans",
//           "value": "8"
//         },
//         {
//           "label": "Shorts",
//           "value": "9"
//         }
//       ]
//     }
//   ]