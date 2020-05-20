import { Customer, CustomerRow} from "../models/Customer";
import { db } from "../dao/db";

// Function to get all customers
export function getAllCustomers(): Promise<Customer[]> {

    const sql = 'SELECT * FROM customer';

    return db.query<CustomerRow>(sql, []).then(result => {
        const rows: CustomerRow[] = result.rows;

        const customer: Customer[] = rows.map(row => Customer.from(row));
        return customer;

    });
}


// Function to get Customers by their id
export function getCustomerById(id: number): Promise<Customer> {
    const sql = 'SELECT * FROM customer WHERE id=$1';

    return db.query<CustomerRow>(sql, [id])
    .then(result => result.rows.map(row => Customer.from(row))[0]);
}


// Function to save a new customer to the database
export function saveCustomer(customer: Customer): Promise<Customer> {
    const sql = `INSERT INTO customer (first_name, last_name, email, phone) \
    VALUES ($1, $2, $3, $4) RETURNING *`;

    return db.query<CustomerRow>(sql, [
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.phone
    ]).then(result => result.rows.map(row => Customer.from(row))[0]);
}

