import React, {useState} from 'react';
import FoodItem from '../Components/FoodItem';
import foodItems from '../data/foodItems.json';
import { MenuProperties, SearchTermType, FoodItemType } from '../types';
import { Link } from 'react-router-dom';


const MenuAll : React.FC<MenuProperties> = ({addToCart}) => {
    const allItems = Object.values(foodItems).flat();
    const [searchTerm, setSearchTerm] = useState<SearchTermType>("");
    const [filteredItems, setFilteredItems] = useState<FoodItemType[]>(allItems);

    /**
     * Searches json of food items given a specific search term
     * @param term 
     */
    const searchFoodItems = async(term: string) => {
        // Flatten food item data
        const allItems = Object.values(foodItems).flat();

        const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(term.toLowerCase()));
        setFilteredItems(filtered);
    };

    return (
        <div className = "allItems">
            <div className = "header">
                <Link to="/menu">Menu</Link>
                <h1>Menu</h1>
            </div>
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
    )
}
export default MenuAll;