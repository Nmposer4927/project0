import { Product } from '../models/Product';
import * as productDao from '../dao/product-dao';

// Retrieve all product with following function
export function getAllProducts(): Promise<Product[]> {
    return productDao.getAllProducts();
}

// Retrieve the product by its id
export function getProductById(id:number): Promise<Product> {
    return productDao.getProductById(id);
}