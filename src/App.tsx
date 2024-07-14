import React, { useEffect, useState } from 'react';
import FoodItem from './Components/FoodItem.tsx';
import { FoodItemType, Items, SearchTermType } from './types.ts';
import foodItems from './data/foodItems.json'; // Static data does not need useState

const App: React.FC = ()  => {
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
  }

  return (
    <div className = "app">
      <h1>E-Commerce Application</h1>

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
          >Search</button>
      </div>
      {
        filteredItems.length > 0 ? (
        <div className="container">
          {filteredItems.map((item : FoodItemType) => (
            <FoodItem key={item.id} item = {item}/>
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

export default App;
