import React, { useState } from 'react';
import { FoodItemType, SearchTermType } from '../types';
import FoodItem from '../Components/FoodItem.tsx';
import foodItems from '../data/foodItems.json';

interface MenuProperties {
    addToCart: (id: number) => void;
} 

const Menu: React.FC<MenuProperties> = ({addToCart})  => {
    const [searchTerm, setSearchTerm] = useState<SearchTermType>("");
    const [filteredItems, setFilteredItems] = useState<FoodItemType[]>(foodItems);

    /**
     * Searches json of food items given a specific search term
     * @param term 
     */
    const searchFoodItems = async(term: string) => {
        setSearchTerm(term);
        const filtered = foodItems.filter(item => 
        item.name.toLowerCase().includes(term.toLowerCase()));
        setFilteredItems(filtered);
    };

    return (
        <div className = "menu">
            <div className = "search">
                <input 
                placeholder = "Search for food..."
                value = {searchTerm}
                // If we want to search automatically,
                // change to "searchFoodItems"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={() => searchFoodItems(searchTerm)}
                    >Search
                </button>
            </div>
            {
                filteredItems.length > 0 ? (
                <div className="container">
                {filteredItems.map((item : FoodItemType) => (
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
    );
};

export default Menu;