import express from 'express';
import * as ordersService from '../services/orders-service';

export const ordersRouter = express.Router();

/*
    http://localhost:3001/orders
    Retrives an array of all orders in the database
*/
ordersRouter.get('', (request, response, next) => {
    ordersService.getAllOrders().then(orders => {
        response.set('content-type', 'application/json')
        response.json(orders);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    http://localhost:3001/orders/:id
    Retrieves a specified single order from the database by its Id
    If the order does not already exist, then sends 404
*/
ordersRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    ordersService.getOrdersById(id).then(orders => {
        if(!orders){
            response.sendStatus(404);
        }else {
            response.json(orders);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

/*
    POST http://localhost:3001/orders
    Creates a new order and then saves them into the database.
    Returns the inserted data as Json with a status of 201.
*/
ordersRouter.post('', (request, response, next) => {
    const orders = request.body;
    ordersService.saveOrders(orders)
    .then(newOrders => {
        response.status(201);
        response.json(newOrders);
        next();
    }).catch(err => {
     response.sendStatus(500);
    })
})