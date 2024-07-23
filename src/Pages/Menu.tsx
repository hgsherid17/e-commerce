import React, { useState } from 'react';
import { FoodItemType, SearchTermType, FoodItemCategories, MenuProperties } from '../types';
import FoodItem from '../Components/FoodItem.tsx';
import foodItems from '../data/foodItems.json';
import FoodCategory from '../Components/FoodCategory.tsx';
import { Link } from 'react-router-dom';

const Menu: React.FC<MenuProperties> = ({addToCart})  => {
    const allItems = Object.values(foodItems).flatMap(category => category.items);

    const categories = foodItems as FoodItemCategories;
    return (
    
        <div className = "menu">
            <h1>MENU</h1>

            <div className = "container">
                {
                    Object.keys(foodItems).map(category => (
                        <FoodCategory key={category} category={category} numItems={categories[category].items.length} image={categories[category].image} />
                    ))
                } 
                <div className = "category">
                    <img src="/images/two_burgers.jpg" />
                    <div className ="menuAllCategory">
                        <h2>View all</h2>

                        <p>{allItems.length} Items</p>

                        <p><Link to={`/menu/all`}>View Items</Link></p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Menu;