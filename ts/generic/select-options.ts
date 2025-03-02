export type SelectOption = {
    value: string;
    label: string;
    data?: {
        image?: string;
        phone?: string;
        contact_type?: number;
    };
};

export function createSelectOption<T>(
    items: T[] = [],
    formatItem: (item: T) => SelectOption,
): SelectOption[] {
    return items.map(formatItem);
}

// Example 1: Basic usage of createSelectOption with simple objects
type User = {
    id: string;
    name: string;
};

const users: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
];

const userOptions = createSelectOption(users, (user) => ({
    value: user.id,
    label: user.name
}));
console.log(userOptions);
/* Output:
[
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' }
]
*/

// Example 2: Using createSelectOption with data property
type Contact = {
    id: string;
    name: string;
    phoneNumber: string;
    type: number;
    avatar: string;
};

const contacts: Contact[] = [
    {
        id: '1',
        name: 'Alice Cooper',
        phoneNumber: '+1234567890',
        type: 1,
        avatar: 'alice.jpg'
    },
    {
        id: '2',
        name: 'Bob Wilson',
        phoneNumber: '+0987654321',
        type: 2,
        avatar: 'bob.jpg'
    }
];

const contactOptions = createSelectOption(contacts, (contact) => ({
    value: contact.id,
    label: contact.name,
    data: {
        image: contact.avatar,
        phone: contact.phoneNumber,
        contact_type: contact.type
    }
}));
console.log(contactOptions);
/* Output:
[
    {
        value: '1',
        label: 'Alice Cooper',
        data: {
            image: 'alice.jpg',
            phone: '+1234567890',
            contact_type: 1
        }
    },
    {
        value: '2',
        label: 'Bob Wilson',
        data: {
            image: 'bob.jpg',
            phone: '+0987654321',
            contact_type: 2
        }
    }
]
*/


