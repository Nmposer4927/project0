export class Product{
    id: number;
    plantName: string;
    price: number;
    unitsStocked: number;


    static from(obj: ProductRow): Product {
        const product = new Product(
            obj.id, obj.plant_name, obj.price, obj.units_stocked,
        );
        return product;
    }

     constructor(id: number, plantName: string, price: number, unitsStocked: number){
        this.id = id;
        this.plantName = plantName;
        this.price = price;
        this.unitsStocked = unitsStocked;
    }
}

export interface ProductRow {
    id: number;
    plant_name: string;
    price: number;
    units_stocked: number;
}