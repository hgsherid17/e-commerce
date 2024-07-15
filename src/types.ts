// Represents a food item
export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: number;
    calories: number;
}

// Represents a "cart" full of food items and a total price
export interface CartType {
    items: FoodItemType[];
    total: number;
}

export type SearchTermType = string;
export type count = number;

