export function removeEmptyValuesFromObject(obj: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
}


const formData = {
    name: 'John',
    email: 'john@example.com',
    phone: '',
    address: '',
    age: '30'
};

const cleanedData = removeEmptyValuesFromObject(formData);
console.log(cleanedData);
/* Output:
{
    name: 'John',
    email: 'john@example.com',
    age: '30'
}
*/