export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: number;
    calories: number;
}

export interface Items {
    items: FoodItemType[];
}

export type SearchTermType = string;