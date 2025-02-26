export type GlobalFilters = Partial<{
    page: number;
    page_size: number;
    role_id: string;
    status: string;
    name: string;
    full_name: string;
    role_name: string;
    contact_type: string | number;
    sort: string;
    start_time: string;
    order_by: string;
    position_id: string;
    member_id: number;
    outlet_id: number;
    member_ids: number[];
    start_date: string;
}>;



export function isTruthyValue(value: unknown) {
    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value as Record<string, unknown>).length > 0;
    }

    return !!value;
}


function addQueryPair(pairs: string[], key: string, value: string) {
    pairs.push(`${key}=${encodeURIComponent(value)}`);
}

function buildQueryString(obj: GlobalFilters) {
    return Object.entries(obj).reduce((pairs, [key, value]) => {
        if (!isTruthyValue(value)) {
            return pairs;
        }

        const encodedKey = encodeURIComponent(key);

        if (Array.isArray(value)) {
            for (const item of value) {
                if (isTruthyValue(item)) {
                    addQueryPair(pairs, encodedKey, String(item));
                }
            }
        } else {
            addQueryPair(pairs, encodedKey, value as string);
        }

        return pairs;
    }, [] as string[]);
}

export function createQueryString(obj: GlobalFilters) {
    return buildQueryString(obj).join('&');
}



// Example 1: Basic usage with simple parameters
const filters1: GlobalFilters = {
    page: 1,
    page_size: 10,
    status: 'active'
};
console.log(createQueryString(filters1));
// Output: page=1&page_size=10&status=active



// Example 2: Using array values
const filters2: GlobalFilters = {
    member_ids: [1, 2, 3],
    status: 'pending'
};
console.log(createQueryString(filters2));
// Output: member_ids=1&member_ids=2&member_ids=3&status=pending



// Example 3: Mixed types and filtering falsy values
const filters3: GlobalFilters = {
    page: 1,
    name: '',              // will be filtered out (falsy)
    member_id: 123,
    member_ids: [],        // will be filtered out (empty array)
    status: 'active',
    outlet_id: 0           // will be filtered out (falsy)
};
console.log(createQueryString(filters3));
// Output: page=1&member_id=123&status=active

// Example 4: Using date strings
const filters4: GlobalFilters = {
    start_date: '2024-01-01',
    start_time: '09:00:00',
    role_name: 'admin'
};
console.log(createQueryString(filters4));
// Output: start_date=2024-01-01&start_time=09%3A00%3A00&role_name=admin