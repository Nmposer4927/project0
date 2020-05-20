export class OrderDetail {
    id: number;
    quantity: number;

    static form(obj: OrderDetailRow): OrderDetail {
        const orderDetail = new OrderDetail(
            obj.id, obj.quantity
        );
        return orderDetail;
    }

    constructor(id: number, quantity: number){
        this.id = id;
        this.quantity= quantity;
    }
}

export interface OrderDetailRow {
    id: number;
    quantity: number;
}