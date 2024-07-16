import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
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
        if (cart.find(item => addedItem === item)) {
          console.log("Item already added: " + addedItem.name);
        }
        else {
          setCart(prevCart => [...prevCart, addedItem] );
          setTotalPrice(prevTotal => prevTotal + addedItem.price);
          console.log("Added item " + addedItem.name + " to cart");
        } 
        
    }
    else {
      console.error("could not find item " + id);
    }

    // TODO: If user adds the same item multiple times, print the number of that item
    // in the cart rather than the same item multiple times (e.g. 3x Wings - $5.99)
  };

  /**
   * Removes a given food item by id from an array representing a cart
   * @param id 
   */
  const removeFromCart = (id: number) => {
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove) {
      const updatedCart = cart.filter((item) => itemToRemove !== item);
      setCart(updatedCart);
      setTotalPrice(prevTotal => prevTotal - itemToRemove.price);

      console.log("Removed item: " + itemToRemove.id + " from cart")
    }
    else {
      console.error("Item with id: " + id + "is not in the cart");
    }
  }

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
    setCart(cart);
  }, [totalPrice, cart])

  return (
    <Router>
    <div className = "app">
      <div className ="topBar">
        <button className = "openCart" onClick={() => toggleCart()}>Open Cart</button>
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
      { isCartOpen && (
        <div>
        <div className = "overlay" onClick = {toggleCart}></div>
        
        <Cart 
          cart = {cart}
          totalPrice = {totalPrice}
          currentTax = {currentTax}
          isOpen = {isCartOpen}
          toggle = {toggleCart}
          removeFromCart={removeFromCart}
        />
        </div>
        )}
    </div>
    </Router>
  );
};

export default App;
