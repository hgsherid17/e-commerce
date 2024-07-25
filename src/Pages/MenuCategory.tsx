import React from 'react';
import { useParams, Link } from 'react-router-dom';
import foodItems from '../data/foodItems.json'
import { FoodItemCategories, FoodItemType, MenuProperties } from '../types';
import FoodItem from '../Components/FoodItem.tsx'

const MenuCategory : React.FC<MenuProperties> = ({addToCart}) => {
    const { category } = useParams<{ category: string }>();
    const categories = foodItems as FoodItemCategories;
    const data = categories[category as keyof FoodItemCategories] || [];

    const { items } = data;

    return (
        <div className = "menuCategory">
            <div className = "header">
                <Link to="/menu">Menu</Link>
                <h1>{category}</h1>
            </div>
            <div className = "categoryItems">
            {
                    items.length > 0 ? (
                    <div className="container">
                        {items.map((item : FoodItemType) => (
                            <FoodItem key={item.id} item = {item} addToCart = {addToCart}/>
                        ))}
                    </div>
                    ) :
                    (
                    <div className="404">
                        <h2>No food items found</h2>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
export default MenuCategory;