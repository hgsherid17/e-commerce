import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ApplicablePromoItems from './Pages/ApplicablePromoItems.tsx';
import promos from './data/promotions.json';

/**
 * 
 * NOTE TO ANY ONLOOKERS
 * THIS APP COMPONENT IS WILDLY EMBARASSING.
 * IT STRESSES ME OUT TOO.
 * I JUST DO NOT HAVE TIME TO MOVE THESE FUNCTIONS INTO COMPONENTS :(
 */

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
  const [applicableItems, setApplicableItems] = useState<FoodItemType[]>([]);
  const [actualTotal, setActualTotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  const tax = 0.04;

  const toCartItemType = (item: FoodItemType): CartItemType => {
   //return Object.assign(item, {quantity: 1}, {discount: 0});
    return {
      ...item,
      quantity: 1,
      discount: 0
    };
  }

  const getCategoryByItemId = (itemId: number): number | undefined => {
    for (const categoryKey in foodItems) {
        const category = foodItems[categoryKey as keyof typeof foodItems];
        if (category.items.some(item => item.id === itemId)) {
            return category.id;
        }

    }
    return undefined;
  };

  const bogo = (item: CartItemType, quantity: number) => {
    let discount = 0;

    if (quantity >= 2) {
      if (quantity % 2 === 0) {
        discount = (quantity / 2) * item.price;
      }
      else {
        discount = ((quantity - 1) / 2) * item.price;
      }
    }

    item.discount = discount;

    return discount;

  }

  const applyPromotion = (item: CartItemType, quantity: number) => {

    let discount = 0;

    const categoryId = getCategoryByItemId(item.id);

    if (categoryId) {
      for (const promo of promos) {
        if (promo.applicableItems.includes(categoryId)) {
          if (promo.type === "BOGO") {
            console.log("BOGO: " + discount + " " + item.discount)
            discount = bogo(item, quantity);
            console.log("AFTER BOGO: " + discount + " " + item.discount)
          }
          if (promo.type === "FREEITEM") {
            // Free item
          }
        }
      }
    }
    // Update cart with new discount
    /*setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, discount } : cartItem
      )
    );
    console.log(cart);*/
    
  }

  /**
   * Adds a given food item by id to an array representing a cart
   * @param id 
   */
  const addToCart = (id: number) => {
    const addedItem = allItems.find(item => item.id === id);
    //let cartItem = CartItem | null;

    // If item exists
    if (addedItem) {
        // Find item in cart array
        const itemIndex = cart.findIndex(item => item.id === id);

        // Item is in cart
        if (itemIndex >= 0) {
          const cartItem = cart[itemIndex];

          // Item cannot have quantity above 20
          if (cartItem.quantity < 20) {
            // Update item quantity
            cartItem.quantity += 1;
            console.log("New quantity of cart item " + cart[itemIndex].name + ": " + cart[itemIndex].quantity);

            // Update count and price
            setCartCount(prevCount => prevCount + 1);
            setActualTotal(prevTotal => prevTotal + addedItem.price);

            // Apply promos
            applyPromotion(cartItem, cartItem.quantity);
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
          console.log("Added item " + cartItem.name + " to cart. Quantity: " + cartItem.quantity + " discount " + cartItem.discount);

          // Update count and price
          setCartCount(prevCount => prevCount + 1)
          setActualTotal(prevTotal => prevTotal + addedItem.price);

          // Apply promos
          applyPromotion(cartItem, cartItem.quantity);
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

        // Set total and count 
        setActualTotal(prevTotal => prevTotal - (itemToRemove.price * quantity));
        setCartCount(prevCount => prevCount - quantity);
      }
      if (quantity === itemToRemove.quantity - 1) {
        setCart(prevCart => 
          prevCart.map(item => 
            item.id === id ? { ...item, quantity: quantity} : item
        ));
        
        // Set total and count
        setActualTotal(prevTotal => prevTotal - itemToRemove.price);
        setCartCount(prevCount => prevCount - 1);

        // Apply promos
        applyPromotion(itemToRemove, quantity);

      }
    }
  }

  /**
   * Opens and closes the "cart" popup
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log("Is cart open: " + !isCartOpen);
  };

  const calculateDiscount  =() => {
    const totalDiscount = cart.reduce((total, item) => total + item.discount, 0);
    setTotalDiscount(totalDiscount);

  };


  useEffect(() => {
    calculateDiscount();
    setTotalPrice(actualTotal - totalDiscount);
  }, [cart, actualTotal, totalDiscount]); 

  // Automatically update tax when item is added
  useEffect(() => {
    setCurrentTax(totalPrice * tax);
  }, [totalPrice])

  return (

    <div className = "app">
      <NavBar toggleCart = {toggleCart} cartCount = {cartCount}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<MenuCategory addToCart={addToCart}/>} />
        <Route path="/menu/all" element={<MenuAll addToCart = {addToCart} getAllFoodItems={getAllFoodItems}/>} />
        <Route path="/checkout" element={<Checkout cart = {cart} currentTax = {currentTax} totalPrice={totalPrice} setPaymentInfo = {setPaymentInfo} actualTotal={actualTotal} />} />
        <Route path="/confirmation" element={<Confirmation paymentInfo = {paymentInfo} />} />
        <Route path="/applicable-items/:id" element={<ApplicablePromoItems addToCart={addToCart} applicableItems={applicableItems} setApplicableItems = {setApplicableItems} />} />
      </Routes>

      { isCartOpen && (
        <div>
        <div className = "overlay" onClick = {toggleCart}></div>
        
        <Cart 
          cart = {cart}
          totalPrice = {totalPrice}
          actualTotal = {actualTotal}
          currentTax = {currentTax}
          cartCount = {cartCount}
          toggle = {toggleCart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
        />
        </div>
        )}
      
      <footer>Copyright Hannarby's Enterprises 2024</footer>

    </div>
  );
};

export default App;