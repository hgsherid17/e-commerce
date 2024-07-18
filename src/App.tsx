import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodItem from './Components/FoodItem.tsx';
import Cart from './Components/Cart.tsx';
import { CartItemType, FoodItemType, CartType } from './types.ts';
import foodItems from './data/foodItems.json'; // Static data does not need useState
import Menu from './Pages/Menu.tsx';
import NavBar from './Components/NavBar.tsx';

// TODO: Change to pass in FoodItem instead of id?

const App: React.FC = ()  => {

  // TODO: Update cart item count bruv
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentTax, setCurrentTax] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  const tax = 0.04;

  const toCartItemType = (item: FoodItemType): CartItemType => {
   return Object.assign(item, {quantity: 1});
  }

  /**
   * Adds a given food item by id to an array representing a cart
   * @param id 
   */
  const addToCart = (id: number) => {
    const addedItem = foodItems.find(item => item.id === id);
    // const itemIndex = cart.findIndex(item => item.id === id);
    // If item exists
    if (addedItem) {
        // If item is already in cart, increment count
        const isInCart = cart.find((item => addedItem === item));
        if (isInCart) {
          isInCart.quantity += 1;
          console.log("New quantity of cart item " + isInCart.name + ": " + isInCart.quantity);
        }
        // Otherwise, convert to cart item type add to cart with count of one
        else {
          const cartItem = toCartItemType(addedItem);
          setCart(prevCart => [...prevCart, cartItem]);

          console.log("Added item " + cartItem.name + " to cart. Quantity: " + cartItem.quantity);
        } 

        setTotalPrice(prevTotal => prevTotal + addedItem.price);
        setCartCount(cartCount + 1);
    }
    else {
      console.error("Could not find item " + id);
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
      setTotalPrice(prevTotal => prevTotal - (itemToRemove.price * itemToRemove.quantity));
      setCartCount(cartCount - itemToRemove.quantity);
      console.log("Removed item: " + itemToRemove.id + " from cart")
    }
    else {
      console.error("Item with id: " + id + "is not in the cart");
    }
  }

  const updateItemQuantity = (id: number, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: quantity } : item
    ));
  }

  /**
   * Opens and closes the "cart" popup
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log("Is cart open: " + !isCartOpen);
  };

  // Automatically update tax when item is added
  useEffect(() => {
    setCurrentTax(totalPrice * tax);
  }, [totalPrice] )

  return (

    <div className = "app">

      <NavBar toggleCart = {toggleCart} cartCount = {cartCount}/>

      <Routes>
        <Route path="/menu" element={<Menu addToCart = {addToCart} />} />
      </Routes>

      { isCartOpen && (
        <div>
        <div className = "overlay" onClick = {toggleCart}></div>
        
        <Cart 
          cart = {cart}
          totalPrice = {totalPrice}
          setTotalPrice = {setTotalPrice}
          currentTax = {currentTax}
          cartCount = {cartCount}
          setCartCount = {setCartCount}
          toggle = {toggleCart}
          removeFromCart={removeFromCart}
          updateItemQuantity={updateItemQuantity}
        />
        </div>
        )}
      
      <footer>Copyright Hannarby's Enterprises 2024 lol</footer>

    </div>
  );
};

export default App;
