import { compareAsc, parseISO, isValid } from 'date-fns';

export function convertStringToLowercase(text: string): string {
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
    price_type: PriceType;
};

type ChargeWithDate = Omit<ChargeEntry, 'price_type'> & {
    price_type: Lowercase<PriceType>;
    date: string;
};

type ChargeData = {
    current: {
        hourly_charge: number;
        date: string;
    };
    future?: {
        hourly_charge: number;
        dates: string[];
    };
};

type GroupedChargeResult = Partial<Record<Lowercase<PriceType>, ChargeData>>;

// Custom error for better debugging
class ChargeProcessingError extends Error {
    constructor(message: string, public readonly context?: Record<string, unknown>) {
        super(message);
        this.name = 'ChargeProcessingError';
    }
}

/**
 * Groups charge entries by price type and organizes them into current and future charges.
 * 
 * @param chargeByDateMap - Map of date strings to charge entries
 * @returns Grouped charges organized by normalized price type, or undefined if processing fails
 * 
 * @example
 * ```typescript
 * const charges = {
 *   '2025-01-01': { hourly_charge: 33, price_type: 'OUTLET_POSITION_PRICE' }
 * };
 * const result = groupCharges(charges);
 * console.log(result?.outlet_position_price?.current.date); // '2025-01-01'
 * ```
 */
const groupCharges = (
    chargeByDateMap: Record<string, ChargeEntry>
): GroupedChargeResult | undefined => {
    try {
        // Input validation
        if (!chargeByDateMap || Object.keys(chargeByDateMap).length === 0) {
            console.warn('Empty or invalid charge data provided');
            return {};
        }

        // Group by normalized price_type with date validation
        const groupedByType = Object.entries(chargeByDateMap).reduce(
            (acc, [dateStr, charge]) => {
                // Validate date format
                const parsedDate = parseISO(dateStr);
                if (!isValid(parsedDate)) {
                    console.warn(`Invalid date format: ${dateStr}. Skipping entry.`);
                    return acc;
                }

                // Validate charge data
                if (typeof charge.hourly_charge !== 'number' || charge.hourly_charge < 0) {
                    console.warn(`Invalid hourly_charge: ${charge.hourly_charge} for date ${dateStr}. Skipping entry.`);
                    return acc;
                }

                const price_type = convertStringToLowercase(charge.price_type);

                if (!acc[price_type]) {
                    acc[price_type] = [];
                }

                acc[price_type]!.push({
                    date: dateStr,
                    hourly_charge: charge.hourly_charge,
                    price_type
                });

                return acc;
            },
            {} as Record<Lowercase<PriceType>, ChargeWithDate[]>
        );

        // Check if we have any valid data after filtering
        if (Object.keys(groupedByType).length === 0) {
            console.warn('No valid charge entries found after validation');
            return {};
        }

        // For each type, sort and split into current/future
        const result = Object.entries(groupedByType).reduce(
            (acc, [priceType, charges]) => {
                try {
                    // Sort charges by date
                    const sortedCharges = charges.sort((a, b) => {
                        const dateA = parseISO(a.date);
                        const dateB = parseISO(b.date);
                        return compareAsc(dateA, dateB);
                    });

                    if (sortedCharges.length === 0) return acc;

                    const firstCharge = sortedCharges[0];
                    const restCharges = sortedCharges.slice(1);

                    acc[priceType as Lowercase<PriceType>] = {
                        current: {
                            hourly_charge: firstCharge.hourly_charge,
                            date: firstCharge.date,
                        },
                    };

                    // Add future charges if they exist
                    if (restCharges.length > 0) {
                        acc[priceType as Lowercase<PriceType>]!.future = {
                            hourly_charge: restCharges[0].hourly_charge,
                            dates: restCharges.map((c) => c.date),
                        };
                    }

                    return acc;
                } catch (error) {
                    console.error(`Error processing price type ${priceType}:`, error);
                    return acc;
                }
            },
            {} as GroupedChargeResult
        );

        return result;

    } catch (error) {
        console.error('Failed to process charge data:', error);
        throw new ChargeProcessingError(
            'Failed to group charges',
            { originalError: error, inputKeys: Object.keys(chargeByDateMap) }
        );
    }
};

// Helper function to safely access grouped charges
const safeGetChargeData = (
    groupedCharges: GroupedChargeResult | undefined,
    priceType: Lowercase<PriceType>
): ChargeData | null => {
    return groupedCharges?.[priceType] ?? null;
};

// Helper function to get all available price types
const getAvailablePriceTypes = (
    groupedCharges: GroupedChargeResult | undefined
): Lowercase<PriceType>[] => {
    return groupedCharges ? Object.keys(groupedCharges) as Lowercase<PriceType>[] : [];
};

// Example backend data with better typing
const charge_by_date_map: Record<string, ChargeEntry> = {
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

// Usage examples
const groupedCharges = groupCharges(charge_by_date_map);
console.dir(groupedCharges, { depth: null });

// ✅ Safe access patterns (your original approach still works!)
console.log('Direct access:', groupedCharges?.outlet_member_position_price);
console.log('Nested access:', groupedCharges?.outlet_position_price?.current.date);

// ✅ Enhanced helper functions for additional safety
const outletData = safeGetChargeData(groupedCharges, 'outlet_position_price');
if (outletData) {
    console.log('Outlet current date:', outletData.current.date);
    console.log('Outlet future dates:', outletData.future?.dates);
}

// ✅ Get available types
const availableTypes = getAvailablePriceTypes(groupedCharges);
console.log('Available price types:', availableTypes);

// ✅ Example with error handling
try {
    const invalidData = {
        'invalid-date': { hourly_charge: -5, price_type: 'OUTLET_POSITION_PRICE' as PriceType },
        '2025-01-01': { hourly_charge: 50, price_type: 'OUTLET_POSITION_PRICE' as PriceType }
    };

    const result = groupCharges(invalidData);
    console.log('Result with invalid data:', result);
} catch (error) {
    if (error instanceof ChargeProcessingError) {
        console.error('Processing error:', error.message, error.context);
    }
}

export { groupCharges, safeGetChargeData, getAvailablePriceTypes, ChargeProcessingError };
export type { PriceType, ChargeEntry, ChargeWithDate, GroupedChargeResult, ChargeData };