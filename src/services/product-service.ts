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

// Function to add a new product to the database
export function saveProduct(product: Product): Promise<Product> {

    console.log(product);

    const newProduct = new Product(
        undefined, product.plantName, product.price,
        product.unitsStocked
    );

    if(product.plantName && product.price && product.unitsStocked){
        return productDao.saveProduct(newProduct);
    }else {
        console.warn('Invalid Product');
        return new Promise((resolve, reject) => reject(422));
    }
}
