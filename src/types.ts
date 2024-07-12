export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: string;
    calories: number;
}

export interface Item {
    item: FoodItemType[];
}