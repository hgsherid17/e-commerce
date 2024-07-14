import React, { useEffect, useState } from 'react';
import FoodItem from './Components/FoodItem.tsx';
import { FoodItemType, SearchTermType } from './types.ts';
import foodItems from './data/foodItems.json'; // Static data does not need useState

const App: React.FC = ()  => {
  const [searchTerm, setSearchTerm] = useState<SearchTermType>("");
  const [filteredItems, setFilteredItems] = useState<FoodItemType[]>(foodItems);
  const [cart, setCart] = useState<FoodItemType[]>([]);

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

  const addToCart = (id: number) => {
    const addedItem = foodItems.find(item => item.id === id);

    if (addedItem) {
      setCart(prevCart => [...prevCart, addedItem] );
      console.log("added item " + id + " to cart");
    }
    else {
      console.error("could not find item " + id);
    }

    // TODO: If user adds the same item multiple times, print the number of that item
    // in the cart rather than the same item multiple times (does that make sense idk)
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
      {
      <div className = "cart">
        <h2>Cart: </h2>
        {cart.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default App;
