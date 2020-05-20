import express from 'express';
import bodyParser from 'body-parser';
import * as productService from '../../src/services/product-service';
import { productRouter } from '../../src/routers/product-router';
import request from 'supertest';



// Set up the mock for product-service dependancy
jest.mock('../../src/services/product-service');
const mockProductService = productService as any;

// Set up the Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/product', productRouter);

// Start testing
describe('GET /product', () => {
    test('Returns correctly in normal enviroment', async () => {
        mockProductService.getAllProducts.mockImplementation(async () => []);

        await request(app)
            .get('/product')
            // Expect a response with status of 200
            .expect(200)
            // content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');

    });

    test('Returns correclty in normal enviroment', async () => {
        mockProductService.getAllProducts.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/product')
            .expect(500);

    });
});


describe('POST /product', () => {
    test('Succesful creation of product should return 201 status', async () => {
        mockProductService.saveProduct.mockImplementation(async () => ({}));
        const payload = {
            plantName: 'Pothos',
            price: '8.99',
            unitsStocked: '27'
        };

        await request(app)
            .post('/product')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Expected to return 500 if error occurs', async () => {
        mockProductService.saveProduct.mockImplementation(async () => {throw new Error()});

        const payload = {
            plantNam: 'Pothos',
            price: '8.99',
            unitsStocked: '27'
        };

        await request(app)
            .post('/product')
            .send(payload)
            .expect(500)
    });

});

describe('GET /product/:id', () => {
    test('Normal behavior with JSON will return status 200', async () => {
        mockProductService.getProductById.mockImplementation(async () => ({}));

        await request(app)
            .get('/product/2')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found return status 404', async() => {
        mockProductService.getProductById.mockImplementation(async () => (0));

        await request(app)
        .get('/product/0')
        .expect(404);
        });

    test('Internal Server Error send status 500', async() => {
        mockProductService.getProductById.mockImplementation(async () => {throw new Error()});

            await request(app)
            .get('/product/201')
            .expect(500)
        });
    });