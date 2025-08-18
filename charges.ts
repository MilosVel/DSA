import { compareAsc, parseISO } from 'date-fns';

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}   // ovo je uobicajeni nastavak za Prettify & {}

export function convertStringToLowercase(text: string) {
    return text.toLowerCase();
}

// All possible PriceTypes
type PriceType =
    | 'OUTLET_POSITION_PRICE'
    | 'SPECIAL_OUTLET_POSITION_PRICE'
    | 'OUTLET_MEMBER_POSITION_PRICE'
    | 'SPECIAL_OUTLET_MEMBER_POSITION_PRICE'
    | 'SPECIAL_MANUALLY_SET_PRICE';

type IChargeDetail = {
    hourly_charge: number;
    price_type: PriceType;
};

type ChargeWithDate = Prettify<Omit<IChargeDetail, 'price_type'> & {
    price_type: Lowercase<PriceType>;
    date: string;
}>


interface IDateChargeMap extends Record<string, IChargeDetail> { }
//  interface IDateChargeMap {
//     [key: string]: IChargeDetail;
// }


type GroupedChargeResult = Partial<
    Record<
        Lowercase<PriceType>,
        {
            current: {
                hourly_charge: number;
                dates: string[];
            };
            future?: {
                hourly_charge: number;
                dates: string[];
            };
        }
    >
>;

// type GroupedChargeResult = {
//     [K in Lowercase<PriceType>]?: {
//         current: {
//             hourly_charge: number;
//             date: string;
//         };
//         future?: {
//             hourly_charge: number;
//             dates: string[];
//         };
//     };
// };





export const groupCharges = (
    dateChargeMap: IDateChargeMap,
): GroupedChargeResult => {
    const groupedByType = Object.entries(dateChargeMap).reduce(
        (acc, [date, charge]) => {
            const price_type = convertStringToLowercase(
                charge.price_type,
            ) as Lowercase<PriceType>;
            if (!acc[price_type]) {
                acc[price_type] = [];
            }
            acc[price_type]!.push({ date, ...charge, price_type });
            return acc;
        },
        {} as Record<Lowercase<PriceType>, ChargeWithDate[]>,
    );

    const result = Object.entries(groupedByType).reduce(
        (acc, [priceType, charges]) => {
            const sortedCharges = [...charges].sort((a, b) =>
                compareAsc(parseISO(a.date), parseISO(b.date)),
            );

            if (sortedCharges.length === 0) return acc;

            const firstCharge = sortedCharges[0];

            const restCharges = sortedCharges.filter(
                (c) => c.hourly_charge !== firstCharge.hourly_charge,
            );

            const currentDates = sortedCharges
                .filter((c) => c.hourly_charge === firstCharge.hourly_charge)
                .map((c) => c.date);

            acc[priceType as Lowercase<PriceType>] = {
                current: {
                    hourly_charge: firstCharge.hourly_charge,
                    dates: currentDates,
                },
            };

            if (restCharges.length > 0) {
                acc[priceType as Lowercase<PriceType>]!.future = {
                    hourly_charge: restCharges[0].hourly_charge,
                    dates: restCharges.map((c) => c.date),
                };
            }

            return acc;
        },
        {} as GroupedChargeResult,
    );

    return result;
};


// // Example backend data
// const charge_by_date_map = {
//     '2025-08-12': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-08-13': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-08-14': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-08-16': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-08-21': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-08-25': {
//         hourly_charge: 33,
//         price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
//     },
//     '2025-08-28': {
//         hourly_charge: 33,
//         price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
//     },
//     '2025-08-29': {
//         hourly_charge: 35,
//         price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
//     },
//     '2025-08-31': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
//     '2025-09-06': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
// };

// const groupedCharges = groupCharges(
//     charge_by_date_map as Record<string, IChargeDetail>,
// );

// console.dir(groupedCharges, { depth: null });

// console.log(groupedCharges?.outlet_member_position_price);


// // {
// //   outlet_position_price: {
// //     current: {
// //       hourly_charge: 33,
// //       dates: [
// //         '2025-08-12',
// //         '2025-08-13',
// //         '2025-08-14',
// //         '2025-08-16',
// //         '2025-08-21',
// //         '2025-08-31',
// //         '2025-09-06'
// //       ]
// //     }
// //   },
// //   special_outlet_position_price: {
// //     current: { hourly_charge: 33, dates: [ '2025-08-25', '2025-08-28' ] },
// //     future: { hourly_charge: 35, dates: [ '2025-08-29' ] }
// //   }
// // }
// // undefined

///////////////////////////
///////////////////////////
///////////////////////////


// Example backend data
const charge_by_date_map = {
    '2025-08-12': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-13': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-14': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-16': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-21': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-22': { hourly_charge: 33, price_type: 'OUTLET_MEMBER_POSITION_PRICE' },
    '2025-08-23': { hourly_charge: 33, price_type: 'SPECIAL_OUTLET_MEMBER_POSITION_PRICE' },
    '2025-08-24': { hourly_charge: 33, price_type: 'OUTLET_MEMBER_POSITION_PRICE' },
    '2025-08-25': { hourly_charge: 33, price_type: 'SPECIAL_MANUALLY_SET_PRICE' },
    '2025-08-01': { hourly_charge: 33, price_type: 'SPECIAL_MANUALLY_SET_PRICE' },
    '2025-08-10': {
        hourly_charge: 33,
        price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
    },
    '2025-08-28': {
        hourly_charge: 33,
        price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
    },
    '2025-08-29': {
        hourly_charge: 35,
        price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
    },
    '2025-08-31': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-09-06': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
};

const groupedCharges = groupCharges(
    charge_by_date_map as Record<string, IChargeDetail>,
);

console.dir(groupedCharges, { depth: null });

console.log(groupedCharges?.outlet_member_position_price);

// {
//   outlet_position_price: {
//     current: {
//       hourly_charge: 33,
//       dates: [
//         '2025-08-12',
//         '2025-08-13',
//         '2025-08-14',
//         '2025-08-16',
//         '2025-08-21',
//         '2025-08-31',
//         '2025-09-06'
//       ]
//     }
//   },
//   outlet_member_position_price: {
//     current: { hourly_charge: 33, dates: [ '2025-08-22', '2025-08-24' ] }
//   },
//   special_outlet_member_position_price: { current: { hourly_charge: 33, dates: [ '2025-08-23' ] } },
//   special_manually_set_price: {
//     current: { hourly_charge: 33, dates: [ '2025-08-01', '2025-08-25' ] }
//   },
//   special_outlet_position_price: {
//     current: { hourly_charge: 33, dates: [ '2025-08-10', '2025-08-28' ] },
//     future: { hourly_charge: 35, dates: [ '2025-08-29' ] }
//   }
// }
// {
//   current: { hourly_charge: 33, dates: [ '2025-08-22', '2025-08-24' ] }
// }