// POPUP SRC: GeeksForGeeks
import React, { useState, SetStateAction } from 'react';
import { CartItemType } from '../types';

interface CartProperties {
    cart: CartItemType[];
    totalPrice: number;
    setTotalPrice: React.Dispatch<SetStateAction<number>>;
    currentTax: number;
    cartCount: number;
    setCartCount: React.Dispatch<SetStateAction<number>>;
    toggle: () => void;
    removeFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}
const Cart : React.FC<CartProperties> = ({cart, totalPrice, setTotalPrice, currentTax, cartCount, setCartCount, toggle, removeFromCart, updateItemQuantity}) => {

    // TODO: Is there a way to do this in App? Or move variables like this to this component?
    const increment = (item: CartItemType) => {
        if (item.quantity < 20) {
            updateItemQuantity(item.id, item.quantity + 1);
            setTotalPrice(totalPrice + item.price);
            setCartCount(cartCount + 1);
        }

    }
    const decrement = (item: CartItemType) => {
        if (item.quantity > 0) {
            updateItemQuantity(item.id, item.quantity -1);
            setTotalPrice(totalPrice - item.price);
            setCartCount(cartCount - 1);
        }
    }
    return (
        <div className = "cart">

            <button className = "toggleCart" onClick={() => toggle()}>X</button>

            <div className ="cartInfo">
                <h2>Cart: </h2>
                    {cart.map((item) => (
                    <div key={item.id}>
                        <p>{item.name} - ${Number(item.price * item.quantity).toFixed(2)}</p>
                        
                        <button className = "removeFromCart" onClick = {() => removeFromCart(item.id)}>Remove From Cart</button>
                        
                        <div className = "quantity">

                            {item.quantity < 20 &&
                                <button onClick = {() => increment(item)}>+</button>
                            }

                            <p>{item.quantity}</p>

                            {item.quantity > 1 &&
                                <button onClick = {() => decrement(item)}>-</button>
                            }

                        </div>
                    </div>
                    ))}
                <p><b>Number of items in cart:</b> {cartCount}</p>
                <p><b>Price of items:</b> ${totalPrice.toFixed(2)}</p>
                <p><b>Tax:</b> ${currentTax.toFixed(2)}</p>
                <p className = "total"><b>Total:</b> ${(totalPrice + currentTax).toFixed(2)}</p>
    
            </div>

        </div>


    );
};

export default Cart;