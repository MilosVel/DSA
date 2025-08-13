import { compareAsc, parseISO } from 'date-fns';

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

type ChargeEntry = {
    hourly_charge: number;
    price_type: PriceType | string; // allow raw backend values
};

type ChargeWithDate = ChargeEntry & { date: string };

// type GroupedChargeResult = Partial<
//     Record<
//         Lowercase<PriceType>,
//         {
//             current: {
//                 hourly_charge: number;
//                 date: string;
//             };
//             future?: {
//                 hourly_charge: number;
//                 dates: string[];
//             };
//         }
//     >
// >;


type GroupedChargeResult = {
    [K in Lowercase<PriceType>]?: {
        current: {
            hourly_charge: number;
            date: string;
        };
        future?: {
            hourly_charge: number;
            dates: string[];
        };
    };
};


const groupChargesCurrentAndFuture = (
    chargeByDateMap: Record<string, ChargeEntry>,
): GroupedChargeResult | undefined => {
    // Group by normalized price_type
    const groupedByType = Object.entries(chargeByDateMap).reduce(
        (acc, [date, charge]) => {
            const price_type = convertStringToLowercase(charge.price_type);
            if (!acc[price_type]) {
                acc[price_type] = [];
            }
            acc[price_type].push({ date, ...charge, price_type });
            return acc;
        },
        {} as Record<PriceType, ChargeWithDate[]>,
    );

    // For each type, sort and split into current/future
    const result = Object.entries(groupedByType).reduce(
        (acc, [priceType, charges]) => {
            const sortedCharges = charges.sort((a, b) =>
                compareAsc(parseISO(a.date), parseISO(b.date)),
            );

            if (sortedCharges.length === 0) return acc;

            const firstCharge = sortedCharges[0];
            const restCharges = sortedCharges.slice(1);

            acc[priceType as PriceType] = {
                current: {
                    hourly_charge: firstCharge.hourly_charge,
                    date: firstCharge.date,
                },
            };

            if (restCharges.length > 0) {
                acc[priceType as PriceType].future = {
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

// Example backend data
const charge_by_date_map = {
    '2025-08-12': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-13': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-14': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-16': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-21': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-08-25': {
        hourly_charge: 33,
        price_type: 'SPECIAL_OUTLET_POSITION_PRICE',
    },
    '2025-08-31': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
    '2025-09-06': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' },
};

const groupedCharges = groupChargesCurrentAndFuture(charge_by_date_map);
console.dir(groupedCharges, { depth: null });
console.log(groupedCharges?.outlet_member_position_price)
console.log(groupedCharges?.outlet_member_position_price?.future?.dates)


// {
//     outlet_position_price: {
//       current: { hourly_charge: 33, date: '2025-08-12' },
//       future: {
//         hourly_charge: 33,
//         dates: [
//           '2025-08-13',
//           '2025-08-14',
//           '2025-08-16',
//           '2025-08-21',
//           '2025-08-31',
//           '2025-09-06'
//         ]
//       }
//     },
//     special_outlet_position_price: { current: { hourly_charge: 33, date: '2025-08-25' } }
//   }
//   undefined
//   undefined