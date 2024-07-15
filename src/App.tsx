import React, { useEffect, useState } from 'react';
import FoodItem from './Components/FoodItem.tsx';
import Cart from './Components/Cart.tsx';
import { FoodItemType, SearchTermType, CartType } from './types.ts';
import foodItems from './data/foodItems.json'; // Static data does not need useState

const App: React.FC = ()  => {
  const [searchTerm, setSearchTerm] = useState<SearchTermType>("");
  const [filteredItems, setFilteredItems] = useState<FoodItemType[]>(foodItems);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<FoodItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentTax, setCurrentTax] = useState<number>(0);
  const tax = 0.04;

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

  /**
   * Adds a given food item by id to an array representing a cart
   * @param id 
   */
  const addToCart = (id: number) => {
    const addedItem = foodItems.find(item => item.id === id);

    if (addedItem) {
        setCart(prevCart => [...prevCart, addedItem] );
        setTotalPrice(prevTotal => prevTotal + addedItem.price);
        console.log("added item " + id + " to cart");
    }
    else {
      console.error("could not find item " + id);
    }

    // TODO: If user adds the same item multiple times, print the number of that item
    // in the cart rather than the same item multiple times (e.g. 3x Wings - $5.99)
  };

  /**
   * Opens and closes the "cart" popup
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log("Is cart open: " + isCartOpen);
  };

  // Automatically update tax when item is added
  useEffect(() => {
    setCurrentTax(totalPrice * tax);
  }, [totalPrice])

  return (
    <div className = "app">
      <div className ="topBar">
        <button className = "openCart" onClick={() => toggleCart()}>{isCartOpen ? 'Close Cart' : 'Open Cart'}</button>

        { isCartOpen && (
        // TODO: Create popup instead using isOpen and toggle... somehow
        <Cart 
          cart = {cart}
          totalPrice = {totalPrice}
          currentTax = {currentTax}
          isOpen = {isCartOpen}
          toggle = {toggleCart}
        />)
        } 
      </div>
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
    </div>
  );
};

export default App;
