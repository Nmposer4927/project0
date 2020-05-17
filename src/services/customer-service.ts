import { Customer } from '../models/Customer';
import * as customerDao from '../dao/customer-dao'

// Function to retrieve All Customers.
export function getAllCustomers(): Promise<Customer[]> {
       return customerDao.getAllCustomers();
}

// Function to retrieve customer by their id.
export function getCustomerById(id: number): Promise<Customer> {
    return customerDao.getCustomerById(id);
}

// Function to add new customer to database
export function saveCustomer(customer: any): Promise<Customer> {

    console.log(customer);
    // Data from the user cannot be trusted
    const newCustomer = new Customer(
        undefined, customer.firstName,
        customer.lastName, customer.email,
        customer.phone
    );
        // Validate the data from the user
    if(customer.firstName && customer.lastName && customer.email && customer.phone) {
        // Data is valid - Continue submitting to DAO
        return customerDao.saveCustomer(newCustomer);
    } else {
        console.warn('Person invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}





