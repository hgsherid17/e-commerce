import React, { useEffect, useState } from 'react';
import FoodItem from './Components/FoodItem.tsx';
import { FoodItemType } from './types.ts';

const App: React.FC = ()  => {
  
  // Create new state to fetch food items 
  const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);

  /*
    Use this block to search and retrieve food items
    const [searchTerm, setSearchTerm] = useState("");

    
    // Need to create component for search
    const searchFoodItems = async(name) => {
      const response = await fetch(????);
      const data = await response.json();

      setFoodItems(data);
    }
  */

  // This method gets food data from the provided json file
  const fetchFoodItems = () => {
    fetch('./data/foodItems.json')
    .then((response) => {
      console.log("fetching food items...");
      return response.json();
    })
    .then((foodItems : FoodItemType[]) => {
      console.log("food items fetched successfully");
      setFoodItems(foodItems);
    })
    .catch((error) => console.error('Error getting food data: ', error));
  };

 useEffect(() => {
    // Fetch data state
    fetchFoodItems();
  }, []);

  return (
    <div className = "app">
      <h1>E-Commerce Application</h1>
      {
        foodItems.length > 0 ? (
        <div className="container">
          {foodItems.map((item) => (<FoodItem key={item.id} item = {item}/>))}
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
