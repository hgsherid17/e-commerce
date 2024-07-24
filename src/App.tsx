import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart.tsx';
import { CartItemType, FoodItemType} from './types.ts';
import foodItems from './data/foodItems.json'; // Static data does not need useState
import Menu from './Pages/Menu.tsx';
import MenuCategory from './Pages/MenuCategory.tsx';
import MenuAll from './Pages/MenuAll.tsx';
import Home from './Pages/Home.tsx';
import NavBar from './Components/NavBar.tsx';
import Checkout from './Pages/Checkout.tsx';
import Confirmation from './Pages/Confirmation.tsx';


// TODO: Make less ugly bruv
// TODO: Pass in category object to FoodCategory component rather than all its info

const getAllFoodItems  = (categories: { [key: string]: { items: FoodItemType[] } }) => {
  // Flatten food items json to get all items from each category
  return Object.values(categories).flatMap(category => category.items);
}

const App: React.FC = ()  => {
  const allItems = getAllFoodItems(foodItems);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentTax, setCurrentTax] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  const tax = 0.04;

  const toCartItemType = (item: FoodItemType): CartItemType => {
   return Object.assign(item, {quantity: 1});
  }

  /**
   * Adds a given food item by id to an array representing a cart
   * @param id 
   */
  /** TODO: LESS UGLY!!!! LESS GROSS!!!!!!!!!!!
   * THIS IS UGLY AND GROSS!!!!!!!!
   * Instead:
   * Check item in cart
   * Use update function to check and update quantity
   * Return bool from that
   * and if true update count and price
   * 
   */
  const addToCart = (id: number) => {
    const addedItem = allItems.find(item => item.id === id);
    // If item exists
    if (addedItem) {

        // Find item in cart array
        const itemIndex = cart.findIndex(item => item.id === id);

        // Item is in cart
        if (itemIndex >= 0) {
          // Item cannot have quantity above 20
          if (cart[itemIndex].quantity < 20) {
            // Update item quantity
            cart[itemIndex].quantity += 1;
            console.log("New quantity of cart item " + cart[itemIndex].name + ": " + cart[itemIndex].quantity);

            // Update count and price
            setCartCount(prevCount => prevCount + 1);
            setTotalPrice(prevTotal => prevTotal + addedItem.price);
          }
          else {
            console.log("Too many " + cart[itemIndex].name + " in cart. Could not update quantity or price.")
          }
        }
        // Item is not in cart
        else {
          // Create a new cart item and add to cart
          const cartItem = toCartItemType(addedItem);
          setCart(prevCart => [...prevCart, cartItem]);
          console.log("Added item " + cartItem.name + " to cart. Quantity: " + cartItem.quantity);

          // Update count and price
          setCartCount(prevCount => prevCount + 1)
          setTotalPrice(prevTotal => prevTotal + addedItem.price);
        } 
        
    }
    else {
      console.error("Could not find item " + id);
    }
  };

  /**
   * Removes a given food item by id from an array representing a cart
   * @param id 
   */
  const removeFromCart = (id: number, quantity: number) => {

    const itemToRemove = cart.find(item => item.id === id);

    if (itemToRemove) {
      // If removing entire item
      if (quantity === itemToRemove.quantity) {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        setTotalPrice(prevTotal => prevTotal - (itemToRemove.price * quantity));
        setCartCount(cartCount - quantity);
        console.log("Removed item: " + itemToRemove.name + " from cart.")
      }
      // If updating quantity in cart
      else {
        if (quantity === itemToRemove.quantity - 1) {
          setCart(prevCart => 
            prevCart.map(item => 
              item.id === id ? { ...item, quantity: quantity } : item
          ));
          setTotalPrice(prevTotal => prevTotal - itemToRemove.price);
          setCartCount(cartCount - 1);
          console.log("New quantity of cart item " + itemToRemove.name + ": " + quantity)
        }
        else {
          console.error("Cannot update quantity of item: " + itemToRemove.name);
        }
      }
    }
    else {
      console.error("Item with id: " + id + "is not in cart");
    }
    /**
    if (itemToRemove) {
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      setTotalPrice(prevTotal => prevTotal - (itemToRemove.price * itemToRemove.quantity));
      setCartCount(cartCount - itemToRemove.quantity);
      console.log("Removed item: " + itemToRemove.id + " from cart")
    }
    else {
      console.error("Item with id: " + id + "is not in the cart");
    }*/
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
    setCart(cart);
  }, [totalPrice, cart])

  return (

    <div className = "app">
      <NavBar toggleCart = {toggleCart} cartCount = {cartCount}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart = {addToCart} />} />
        <Route path="/menu/:category" element={<MenuCategory addToCart={addToCart}/>} />
        <Route path="/menu/all" element={<MenuAll addToCart = {addToCart} getAllFoodItems={getAllFoodItems}/>} />
        <Route path="/checkout" element={<Checkout cart = {cart} currentTax = {currentTax} totalPrice={totalPrice} setPaymentInfo = {setPaymentInfo} />} />
        <Route path="/confirmation/:orderNumber" element={<Confirmation paymentInfo = {paymentInfo} />} />
      </Routes>

      { isCartOpen && (
        <div>
        <div className = "overlay" onClick = {toggleCart}></div>
        
        <Cart 
          cart = {cart}
          totalPrice = {totalPrice}
          currentTax = {currentTax}
          cartCount = {cartCount}
          toggle = {toggleCart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
        />
        </div>
        )}
      
      <footer>Copyright Hannarby's Enterprises 2024 lol</footer>

    </div>
  );
};

export default App;