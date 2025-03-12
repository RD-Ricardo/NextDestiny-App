export class Order {
    customer: Customer
    items: Item[]

    constructor() {
      this.customer = {} as Customer;
      this.items = [];
    }
}
  
  export interface Customer {
    name: string
    email: string
  }
  
  export interface Item {
    productId: string
    quantity: number
  }
  