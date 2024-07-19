import React from 'react';
import { Link } from 'react-router-dom';

interface FoodCategoryProperties {
    category: string;
    numItems: number;
}
const FoodCategory: React.FC<FoodCategoryProperties> = ({category, numItems}) => {

    return (

        <div className = "category">
            <h2>{category}</h2>

            <p>{numItems} Items</p>

            <p><Link to={`/menu/${category}`}>View Items</Link></p>

        </div>
    )
}
export default FoodCategory;