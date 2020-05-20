export class Orders {
    id: number;
    orderDate: Date;
    pickupDate: Date;
    customerId: number;

static from(obj: OrdersRow): Orders {
    const orders = new Orders(
        obj.id, obj.order_date, obj.pickup_date, obj.customer_id
    );
    return orders;
}

constructor(id: number, orderDate: Date, pickupDate: Date, customerId: number){
    this.id = id;
    this.orderDate = orderDate;
    this.pickupDate = pickupDate;
    this.customerId = customerId;
}

}

export interface OrdersRow{
    id: number;
    order_date: Date;
    pickup_date: Date;
    customer_id: number;
}