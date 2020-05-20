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

/*
    POST http://localhost:3001/product
    Creates a new product and then saves the product to the database
    Returns the new product data as JSON with a status of 201.
*/
 productRouter.post('', (request, response, next) => {
     const product = request.body;
     productService.saveProduct(product)
     .then(newProduct => {
         response.status(201);
         response.json(newProduct);
         next();
     }).catch(err => {
        response.sendStatus(500);
     })
 })

