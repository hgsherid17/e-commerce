import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart.tsx';
import { CartItemType, FoodItemType, PromoType} from './types.ts';
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

  const freeitem = (item: CartItemType, promo: PromoType, quantity: number) => {
    let discount = 0;
    const categoryId = getCategoryByItemId(item.id);

    // Check if soda in cart already
    const hasFreeItem = cart.some(cartItem => {
      const freeId = getCategoryByItemId(cartItem.id);
      return freeId && promo.freeItems.includes(freeId) && cartItem.discount > 0;
    });

    if (hasFreeItem) {
      console.log("free");
      return discount;
    }

    if (categoryId && promo.applicableItems.includes(categoryId)) {
      // Item is wings, check for soda
      cart.forEach((free) => {
        const freeId = getCategoryByItemId(free.id);

        // Find soda in cart
        if (freeId && promo.freeItems.includes(freeId)) {
          
          // Wings no longer in cart
          if (quantity === 0) {
            free.discount = 0;
            return free.discount;
          }

          discount = free.price;
          free.discount = discount;

        }
      });
    }
    else {
      // Item is soda, check for wings
      cart.forEach((app) => {
        const appId = getCategoryByItemId(app.id);

        // Find wings in cart
        if (appId && promo.applicableItems.includes(appId)) {
          discount = item.price;
          item.discount = discount;

        }
      });
      
    }

  }

  const applyPromotion = (item: CartItemType, quantity: number) => {

    const categoryId = getCategoryByItemId(item.id);

    for (const promo of promos) {
      if (categoryId && (promo.applicableItems.includes(categoryId) || promo.freeItems.includes(categoryId))) {
        console.log("did I make it " + item.name);
        if (promo.type === "BOGO") {
          bogo(item, quantity);
        }
        else if (promo.type === "FREEITEM") {
          freeitem(item, promo, quantity);
        }
      }
    }
    
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

        applyPromotion(itemToRemove, 0);
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

  const calculateDiscount  = () => {
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