import { OrderDetail, OrderDetailRow } from '../models/Order_Detail';
import { db } from './db'

// Function to get all orderDetail
export function getAllOrderDetail(): Promise<OrderDetail[]> {

    const sql = 'SELECT * FROM customer';

    return db.query<OrderDetailRow>(sql, []).then(result => {
        const rows: OrderDetailRow[] = result.rows;

        const customer: OrderDetail[] = rows.map(row => OrderDetail.from(row));
        return customer;

    });
}

// Function to get Order Details by their id
export function getOrderDetailById(id: number): Promise<OrderDetail> {
    const sql = 'SELECT * FROM order_detail WHERE id=$1';

    return db.query<OrderDetailRow>(sql, [id])
    .then(result => result.rows.map(row => OrderDetail.from(row))[0]);
}

// Function to save a new orderDetail to the database
export function saveOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    const sql = `INSERT INTO order_detail (product_id, order_id, quanity) \
    VALUES ($1, $2, $3) RETURNING *`;

    return db.query<OrderDetail>(sql, [
        orderDetail.productId,
        orderDetail.orderId,
        orderDetail.quantity
    ]).then(result => result.rows.map(row => OrderDetail.from(row))[0]);
}