export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: number;
    calories: number;
}

export type SearchTermType = string;

export type CartType = FoodItemType[];