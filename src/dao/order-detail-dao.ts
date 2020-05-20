import { OrderDetail, OrderDetailRow } from '../models/Order_Detail';
import { db } from './db'

/* Function to get all Order_Details
export function getAllOrderDetail(): Promise<OrderDetail[]> {

    const sql = 'SELECT * FROM customer';

    return db.query<OrderDetailRow>(sql, []).then(result => {
        const rows: OrderDetailRow[] = result.rows;

        const orderDetail: OrderDetail[] = rows.map(row => OrderDetail.from(row));
        return orderDetail;

    });
}

// Function to get Order Details by their id
export function getOrderDetailById(id: number): Promise<OrderDetail> {
    const sql = 'SELECT * FROM order_detail WHERE id=$1';

    return db.query<OrderDetailRow>(sql, [id])
    .then(result => result.rows.map(row => OrderDetail.from(row))[0]);
}
*/