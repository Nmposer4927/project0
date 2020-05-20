import * as customerService from '../../src/services/customer-service';
import * as customerDao from '../../src/dao/customer-dao';
import { Customer } from '../../src/models/Customer';

/*
        Black-Box Testing with Jest
*/

jest.mock('../../src/dao/customer-dao');

const mockCustomerDao = customerDao as any;


describe('saveCustomer', () => {
    test('If no firstName provided return 422', async () => {
        expect.assertions(1);
        mockCustomerDao.saveCustomer.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            lastName: 'Applseed',
            email: 'email@yahoo.com',
            phone: '236-569-8989'
        };

        try {
            await customerService.saveCustomer(payload);
            fail('customerService.saveCustomer did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no lastName provided return 422', async () => {
        expect.assertions(1);
        mockCustomerDao.saveCustomer.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            firstName: 'Jerry',
            email: 'email@yahoo.com',
            phone: '236-569-8989'
        };

        try {
            await customerService.saveCustomer(payload);
            fail('customerService.saveCustomer did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no email provided return 422', async () => {
        expect.assertions(1);
        mockCustomerDao.saveCustomer.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            firstName: 'Jerry',
            lastName: 'Appleseed',
            phone: '236-569-8989'
        };

        try {
            await customerService.saveCustomer(payload);
            fail('customerService.saveCustomer did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no phone provided return 422', async () => {
        expect.assertions(1);
        mockCustomerDao.saveCustomer.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            firstName: 'Jerry',
            lastName: 'Appleseed',
            email: 'email@yahoo.com'
        };

        try {
            await customerService.saveCustomer(payload);
            fail('customerService.saveCustomer did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Transform input into Customer object', async () => {
        mockCustomerDao.saveCustomer.mockImplementation(o => o);

        const payload = {
            firstName: 'Jerry',
            lastName: 'Appleseed',
            email: 'email@yahoo.com',
            phone: '239-569-8998'
        };

        // The input was not a customer but here is tranformed and returned as Customer
        const outcome = await customerService.saveCustomer(payload);
        expect(payload).not.toBeInstanceOf(Customer);
        expect(outcome).toBeInstanceOf(Customer);
    });

    test('ID value should never be manually entered, replaced with generated ID', async () => {
        mockCustomerDao.saveCustomer.mockImplementation(o => o);

        const payload = {
            id: 2,
            firstName: 'Jerry',
            lastName: 'Appleseed',
            email: 'email@yahoo.com',
            phone: '239-569-8998'
        };

        const outcome = await customerService.saveCustomer(payload);

       expect(outcome.id).not.toBe(payload.id);
    });

    test('Invalid field entered in input with no output', async () => {
        mockCustomerDao.saveCustomer.mockImplementation(o => o);

        const payload = {
            firstName: 'Jerry',
            lastName: 'Appleseed',
            email: 'email@yahoo.com',
            phone: '239-569-8998',
            isMarried: true
        };

        const outcome = await customerService.saveCustomer(payload) as any;

       expect(outcome.isMarried).not.toBeDefined();
    });
});