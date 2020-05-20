import { Orders, OrdersRow} from '../models/Orders';
import { db } from '../dao/db';

// Function to get all Orders
export function getAllOrders(): Promise<Orders[]> {
    const sql = 'SELECT * FROM orders';

    return db.query<OrdersRow>(sql, []).then(result => {
        const rows : OrdersRow[] = result.rows;

        const orders: Orders[] =rows.map(row => Orders.from(row));
        return orders;
    });
}

// Function to get Orders by their id
export function getOrdersById(id:number): Promise<Orders> {
    const sql = 'SELECT * FROM orders WHERE id=$1';

    return db.query<OrdersRow>(sql, [id])
    .then(result => result.rows.map(row => Orders.from(row))[0]);
}

// Function to save a new Order
export function saveOrders(orders: Orders): Promise<Orders> {
    const sql = `INSERT INTO orders (order_date, pickup_date) \
    VALUES ($1, $2) RETURNING *`;

    return db.query<OrdersRow>(sql, [
        orders.orderDate,
        orders.pickupDate
    ]).then(result => result.rows.map(row => Orders.from(row))[0]);
}