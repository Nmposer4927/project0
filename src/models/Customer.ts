export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;


    static from(obj: CustomerRow): Customer {
        const customer = new Customer(
            obj.id, obj.first_name, obj.last_name, obj.email, obj.phone
    );
    return customer;
}

    constructor(id: number, firstName: string, lastName: string, email: string, phone: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}

export interface CustomerRow {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
}

