import express from 'express';
import * as customerService from '../services/customer-service';

export const customerRouter = express.Router();

/*
    http://localhost:3001/customer
    Retrives an array of all customers in the database
*/
customerRouter.get('', (request, response, next) => {
    customerService.getAllCustomers().then(customer => {
        response.set('content-type', 'application/json')
        response.json(customer);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    http://localhost:3001/customer/:id
    Retrieves a specified single customer from the database by its Id
    If the customer does not already exist, then sends 404
*/
customerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    customerService.getCustomerById(id).then(customer => {
        if(!customer){
            response.sendStatus(404);
        }else {
            response.json(customer);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

/*
    POST http://localhost:3001/customer
    Creates a new customer and then saves them into the database.
    Returns the inserted data as Json with a status of 201.
*/
customerRouter.post('', (request, response, next) => {
    const customer = request.body;
    customerService.saveCustomer(customer)
    .then(newCustomer => {
        response.status(201);
        response.json(newCustomer);
        next();
    }).catch(err => {
     response.sendStatus(500);
    })
})



