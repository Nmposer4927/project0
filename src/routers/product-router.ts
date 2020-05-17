import express from 'express';
import * as productService from '../services/product-service';

export const productRouter = express.Router();

/*
    http://localhost:3001/product
    Retrieves an array of all product in the database
*/
productRouter.get('', (request, response, next) => {
    productService.getAllProducts().then(product => {
        response.json(product);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3001/product/:id
    Retrieves the product by its id
    if the product does not exist, then send 40
*/
productRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    productService.getProductById(id).then(product => {
        if(!product){
            response.sendStatus(404);
        }else {
            response.json(product);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

