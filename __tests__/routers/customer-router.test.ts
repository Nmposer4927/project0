import express from 'express';
import bodyParser from 'body-parser';
import { customerRouter } from '../../src/routers/customer-router';
import * as customerService from '../../src/services/customer-service';
import request from 'supertest';


/*
    Testing with Supertest
*/

// Set up the mock for customerService dependancy
jest.mock('../../src/services/customer-service');
const mockCustomerService = customerService as any;

// Set up the Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/customer', customerRouter);


describe('GET /customer', () => {
    test('Returns correctly in normal enviroment', async () => {
        mockCustomerService.getAllCustomers.mockImplementation(async () => []);

        await request(app)
            .get('/customer')
            // Expect a response with status of 200
            .expect(200)
            // content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');

    });

    test('Returns correclty in normal enviroment', async () => {
        mockCustomerService.getAllCustomers.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/customer')
            .expect(500);

    });
});

describe('POST /customer', () => {
    test('Succesful creation of customer should return 201 status', async () => {
        mockCustomerService.saveCustomer.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'Jerry',
            lastName: 'Appleseed',
            email: 'email@yahoo.com',
            phone: '239-465-9898'
        };

        await request(app)
            .post('/customer')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

         test('Expected to return 500 if error occurs', async () => {
            mockCustomerService.saveCustomer.mockImplementation(async () => {throw new Error()});

            const payload = {
                firstName: 'Jerry',
                lastName: 'Appleseed',
                email: 'email@yahoo.com',
                phone: '239-465-9898'
            };

            await request(app)
                .post('/customer')
                .send(payload)
                .expect(500)
    });

});

        describe('GET /customer/:id', () => {
            test('Normal behavior with JSON will return status 200', async () => {
                mockCustomerService.getCustomerById.mockImplementation(async () => ({}));

                await request(app)
                    .get('/customer/2')
                    .expect(200)
                    .expect('content-type', 'application/json; charset=utf-8')
            });

            test('No object found return status 404', async() => {
                mockCustomerService.getCustomerById.mockImplementation(async () => (0));

                await request(app)
                .get('/customer/0')
                .expect(404);
                });

            test('Internal Server Error send status 500', async() => {
                mockCustomerService.getCustomerById.mockImplementation(async () => {throw new Error()});

                    await request(app)
                    .get('/customer/201')
                    .expect(500)
                });
            });


