import React from 'react';
import { FoodItemType } from '../types';

// Give FoodItem component properties from FoodItemType
interface FoodItemProperties {
    item: FoodItemType;
}

const FoodItem : React.FC<FoodItemProperties> = ({ item }) => {
   // const [foodItem, setFoodItem] = useState<FoodItems | null>(null);

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
        </div>
    );
}

export default FoodItem;