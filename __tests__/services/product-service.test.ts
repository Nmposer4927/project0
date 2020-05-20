import * as productService from '../../src/services/product-service';
import * as productDao from '../../src/dao/product-dao';
import { Product } from '../../src/models/Product';

// jest
jest.mock('../../src/dao/product-dao');

const mockProductDao = productDao as any;

describe('saveProduct', () => {
    test('If no plantName provided return 422', async () => {
        expect.assertions(1);
        mockProductDao.saveProduct.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            price: 9.99,
            unitsStocked: 9
        };

        try {
            await productService.saveProduct(payload);
            fail('productService.saveProduct did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no price provided return 422', async () => {
        expect.assertions(1);
        mockProductDao.saveProduct.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            plantName: 'Tall pine',
            unitsStocked: 25
        };

        try {
            await productService.saveProduct(payload);
            fail('productService.saveProduct did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('If no unitsStocked provided return 422', async () => {
        expect.assertions(1);
        mockProductDao.saveProduct.mockImplementation(() => {
            console.log('What the mock dao actually calls');
        });

        const payload = {
            plantName: 'Tall pine',
            price: 25
        };

        try {
            await productService.saveProduct(payload);
            fail('productService.saveProduct did not thow the antiipated error');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Transform input into Product object', async () => {
        mockProductDao.saveProduct.mockImplementation(o => o);

        const payload = {
            plantName: 'Rose',
            price: 9.99,
            unitsStocked: 45
        };

        // The input was not a product but here is tranformed and returned as Product
        const outcome = await productService.saveProduct(payload);
        expect(payload).not.toBeInstanceOf(Product);
        expect(outcome).toBeInstanceOf(Product);
    });

    test('ID value should never be manually entered, replaced with generated ID', async () => {
        mockProductDao.saveProduct.mockImplementation(o => o);

        const payload = {
            id: 2,
            plantName: 'Rose',
            price: 9.99,
            unitsStocked: 45
        };

        const outcome = await productService.saveProduct(payload);

       expect(outcome.id).not.toBe(payload.id);
    });

    test('ID value should never be manually entered, replaced with generated ID', async () => {
        mockProductDao.saveProduct.mockImplementation(o => o);

        const payload = {
            id: 2,
            plantName: 'Rose',
            price: 9.99,
            unitsStocked: 45,
            isNativeSpecies: true
        };

        const outcome = await productService.saveProduct(payload) as any;

       expect(outcome.isNativeSpecies).not.toBeDefined();
    });

});