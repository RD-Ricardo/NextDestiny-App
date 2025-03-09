export interface Order {
    customer: Customer
    items: Item[]
  }
  
  export interface Customer {
    name: string
    email: string
  }
  
  export interface Item {
    productId: string
    quantity: number
  }
  