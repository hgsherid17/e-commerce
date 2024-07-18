// Represents a food item
export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: number;
    calories: number;
}

export interface CartItemType extends FoodItemType {
    quantity: number;
}

export interface CartType {
    items: CartItemType[];
    totalPrice: number;
    count: number;
}

export type SearchTermType = string;


