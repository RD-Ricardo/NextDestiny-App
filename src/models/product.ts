export interface ProductDto {
    id: string
    name: string
    description: string
    price: number
    category: number
    images: string[]
    feedbacks: Feedback[]
    status: number
    createdAt: string
    location: Location
    hotelId: string
  }
  
  export interface Feedback {
    comment: string
    rating: number
  }
  
  export interface Location {
    id: string
    city: string
    country: string
    createdAt: string
  }
  