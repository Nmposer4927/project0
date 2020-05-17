import { Product, ProductRow } from '../models/Product';
import { db } from '../dao/db';


// Function to retrieve all products
export function getAllProducts(): Promise<Product[]> {

    const sql = 'SELECT * FROM product';

    return db.query<ProductRow>(sql, []).then(result => {
        const rows: ProductRow[] = result.rows;

        console.log(rows);

        const product: Product[] = rows.map(row => Product.from(row));
        return product;
    });

}

// Function to retrive the product by its id
export function getProductById(id: number): Promise<Product> {

    const sql = 'SELECT * FROM product WHERE id=$1';

    return db.query<ProductRow>(sql, [id])
    .then(result => result.rows.map(row => Product.from(row))[0]);
}
