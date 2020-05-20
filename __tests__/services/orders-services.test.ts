import * as orderService from '../../src/services/orders-service';
import * as ordersDao from '../../src/dao/orders-dao';
import { Orders } from '../../src/models/Orders';

jest.mock('../../src/dao/orders-dao');

const mockOrdersDao = ordersDao as any;

describe('saveOrders', () => {
    test('If no orderDate provided return 422', async () => {
        expect.assertions(1);
        mockOrdersDao.saveOrders.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            pickupDate: '2000-05-05'

        };

        try {
            await orderService.saveOrders(payload);
            fail('orderService.saveOrders did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no pickupDate provided return 422', async () => {
        expect.assertions(1);
        mockOrdersDao.saveOrders.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            orderDate: '2000-05-05'

        };

        try {
            await orderService.saveOrders(payload);
            fail('orderService.saveOrders did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Transform input into Orders object', async () => {
        mockOrdersDao.saveOrders.mockImplementation(o => o);

        const payload = {
            orderDate: '2020-05-16',
            pickupDate: '2020-05-20',
        };

        // The input was not a customer but here is tranformed and returned as Customer
        const outcome = await orderService.saveOrders(payload);
        expect(payload).not.toBeInstanceOf(Orders);
        expect(outcome).toBeInstanceOf(Orders);
    });

    test('ID should never be entered manually, replace with default', async () => {
        mockOrdersDao.saveOrders.mockImplementation(o => o);

        const payload = {
            id: 3,
            orderDate: '2020-05-16',
            pickupDate: '2020-05-20',
        };

        const outcome = await orderService.saveOrders(payload);
        expect(outcome.id).not.toBe(payload.id);
    });


    test('Invaild field entered in input with no designated output', async () => {
        mockOrdersDao.saveOrders.mockImplementation(o => o);

        const payload = {
            orderDate: '2020-05-16',
            pickupDate: '2020-05-20',
            isOnTime: true
        };

        const outcome = await orderService.saveOrders(payload) as any;
        expect(outcome.isOnTime).not.toBeDefined();
    });
});