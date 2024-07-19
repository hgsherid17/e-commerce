// Represents a food item
export interface FoodItemType {
    id: number;
    image: string;
    name: string;
    price: number;
    calories: number;
}

export interface CategoryType {
    image: string;
    items: FoodItemType[];
}
export interface FoodItemCategories {
    [category: string]: CategoryType;

}

export interface CartItemType extends FoodItemType {
    quantity: number;
}

export interface CartType {
    items: CartItemType[];
    totalPrice: number;
    count: number;
}

export interface PromoType {
    id: number;
    image: string;
    description: string;
    type: string;
    applicableItems: number[];
}

export interface MenuProperties {
    addToCart: (id: number) => void;
}


export type SearchTermType = string;


