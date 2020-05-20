export class OrderDetail {
    id: number;
    productId: number;
    orderId: number;
    quantity: number;

    static form(obj: OrderDetailRow): OrderDetail {
        const orderDetail = new OrderDetail(
            obj.id, obj.product_id, obj.order_id, obj.quantity
        );
        return orderDetail;
    }

    constructor(id: number, productId: number, orderId: number, quantity: number){
        this.id = id;
        this.productId = productId;
        this.orderId = orderId;
        this.quantity= quantity;
    }
}

export interface OrderDetailRow {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
}