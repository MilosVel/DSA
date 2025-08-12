import { compareAsc, parseISO } from 'date-fns';

const groupChargesCurrentAndFuture = (
    chargeByDateMap: Record<
        string,
        { hourly_charge: number; price_type: string }
    >,
) => {
    // First, group by price_type
    const groupedByType = Object.entries(chargeByDateMap).reduce(
        (acc, [date, charge]) => {
            const { price_type } = charge;

            if (!acc[price_type]) {
                acc[price_type] = [];
            }

            acc[price_type].push({ date, ...charge });

            return acc;
        },
        {} as Record<
            string,
            Array<{ date: string; hourly_charge: number; price_type: string }>
        >,
    );

    // Then, for each price_type, sort by date and split into current/future
    const result = Object.entries(groupedByType).reduce(
        (acc, [priceType, charges]) => {
            // Sort charges by date
            const sortedCharges = charges.sort((a, b) =>
                compareAsc(parseISO(a.date), parseISO(b.date)),
            );

            if (sortedCharges.length === 0) return acc;

            const firstCharge = sortedCharges[0];
            const restCharges = sortedCharges.slice(1);

            acc[priceType] = {
                current: {
                    hourly_charge: firstCharge.hourly_charge,
                    date: firstCharge.date,
                },
            };

            // Only add future if there are remaining charges
            if (restCharges.length > 0) {
                // Since there can only be one future value, take the first remaining charge
                const futureCharge = restCharges[0];
                acc[priceType].future = {
                    hourly_charge: futureCharge.hourly_charge,
                    dates: restCharges.map((charge) => charge.date),
                };
            }

            return acc;
        },
        {} as Record<string, any>,
    );

    return result;
};

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
// console.log(groupedCharges);
console.dir(groupedCharges, { depth: null });


// {
//     OUTLET_POSITION_PRICE: {
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
//     SPECIAL_OUTLET_POSITION_PRICE: { current: { hourly_charge: 33, date: '2025-08-25' } }
//   }