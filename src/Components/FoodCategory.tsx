import React from 'react';
import { Link } from 'react-router-dom';

interface FoodCategoryProperties {
    category: string;
    numItems: number;
    image: string;
}
const FoodCategory: React.FC<FoodCategoryProperties> = ({category, numItems, image}) => {

    return (

        <div className = "category">
            <img src={image} />
            <div className="content">
                <h2>{category}</h2>

                <p className= "numItems" >{numItems} Items</p>

                <p><Link className = "menuLink" to={`/menu/${category}`}>View Items</Link></p>
            </div>

        </div>
    )
}
export default FoodCategory;