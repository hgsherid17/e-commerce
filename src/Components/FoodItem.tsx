import React, { useState } from 'react';
import { FoodItemType } from '../types';

// Give FoodItem component properties from FoodItemType
interface FoodItemProperties {
    item: FoodItemType;
    addToCart: (id: number) => void;
}

/**
 * This component represents a food item.
 * @param item // A food item read from a JSON file
 * @param addToCart // a method which takes in an id to add an item to cart
 * @returns 
 */
const FoodItem : React.FC<FoodItemProperties> = ({ item, addToCart }) => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        // User may enter only 20 items
        if (count < 20) {
            setCount(prevCount => count + 1);
        }
    }
    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => count - 1);
        }
    }

    // REMINDER: chekc if count zero. If zero, remove from cart
    return (
        <div className = "foodItem">
            <div className = "foodItemImage">
                <img src={item.image !== "N/A" ? item.image : "./images/default.jpg"}/>
            </div>

            <div className = "foodItemInfo">
                <h3>{item.name}</h3>
                <p className="price">${Number(item.price.toFixed(2))}</p>
                <p>Calories: {item.calories}</p>
            </div>

            <button className = "addToCart" onClick={() => addToCart(item.id)}>Add to Cart</button>

        </div>
    );
}

export default FoodItem;