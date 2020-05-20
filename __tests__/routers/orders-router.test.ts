import express from 'express';
import bodyParser from 'body-parser';
import { ordersRouter } from '../../src/routers/orders-router';
import * as orderService from '../../src/services/orders-service';
import request from 'supertest';

jest.mock('../../src/services/orders-service');
const mockOrderService = orderService as any;

const app = express();
app.use(bodyParser.json());
app.use('/orders', ordersRouter);

describe('GET /orders', () => {
    test('Returns correctly in normal enviroment', async () => {
        mockOrderService.getAllOrders.mockImplementation(async () => []);

        await request(app)
            .get('/orders')
            // Expect a response with status of 200
            .expect(200)
            // content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');

    });

    test('Returns correclty in normal enviroment', async () => {
        mockOrderService.getAllOrders.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/orders')
            .expect(500);

    });
});

    describe('POST /orders', () => {
        test('Succesful creation of customer should return 201 status', async () => {
            mockOrderService.saveOrders.mockImplementation(async () => ({}));
        const payload = {
            orderDate: '2020-05-16',
            pickupDate: '2020-05-20'
        };

        await request(app)
            .post('/orders')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8');

    });

    test('Expected to return 500 if error occurs', async () => {
        mockOrderService.getAllOrders.mockImplementation(async () => {throw new Error()});

        const payload = {
            orderDate: '2020-05-16',
            pickupDate: '2020-05-20'
        };

        await request(app)
            .post('/orders')
            .send(payload)
            .expect(500);

    });
});
describe('GET /orders/:id', () => {
    test('Normal behavior with JSON will return status 200', async () => {
        mockOrderService.getOrdersById.mockImplementation(async () => ({}));

        await request(app)
            .get('/orders/2')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found return status 404', async() => {
        mockOrderService.getOdersById.mockImplementation(async () => (0));

        await request(app)
        .get('/orders/0')
        .expect(404);
        });

    test('Internal Server Error send status 500', async() => {
        mockOrderService.getOrdersById.mockImplementation(async () => {throw new Error()});

            await request(app)
            .get('/orders/201')
            .expect(500)
        });
    });