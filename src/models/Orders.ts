export class Orders {
    id: number;
    orderDate: Date;
    pickupDate: Date;


static from(obj: OrdersRow): Orders {
    const orders = new Orders(
        obj.id, obj.orderDate, obj.pickupDate
    );
    return orders;
}

constructor(id: number, orderDate: Date, pickupDate: Date){
    this.id = id;
    this.orderDate = orderDate;
    this.pickupDate = pickupDate;
}

}

export interface OrdersRow{
    id: number;
    orderDate: Date;
    pickupDate: Date;
}