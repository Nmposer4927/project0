import { Orders } from '../models/Orders';
import * as ordersDao from '../dao/orders-dao';

// Function to retrieve all orders
export function getAllOrders(): Promise<Orders[]> {
    return ordersDao.getAllOrders();
}

// Function it retrieve order by their number
export function getOrdersById(id: number): Promise<Orders> {
    return ordersDao.getOrdersById(id);
}

// Function to add new order to database
export function saveOrders(orders: any): Promise<Orders> {
    const newOrders = new Orders(
        undefined, orders.orderDate, orders.pickupDate
    );
    if(orders.orderDate && orders.pickupDate){
        return ordersDao.saveOrders(newOrders);
    } else{
        return new Promise((resolve, reject) => reject(422));
    }
}