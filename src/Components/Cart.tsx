// POPUP SRC: GeeksForGeeks
import React, { useState } from 'react';
import { FoodItemType } from '../types';

interface CartProperties {
    cart: FoodItemType[];
    totalPrice: number;
    currentTax: number;
    toggle: () => void;
    removeFromCart: (id: number) => void;
}
const Cart : React.FC<CartProperties> = ({cart, totalPrice, currentTax, toggle, removeFromCart}) => {

    return (
        <div className = "cart">

            <button className = "toggleCart" onClick={() => toggle()}>X</button>

            <div className ="cartInfo">
                <h2>Cart: </h2>
                    {cart.map((item) => (
                    <div key={item.id}>
                        <p>{item.name} - ${item.price}</p>
                        
                        <button className = "removeFromCart" onClick = {() => removeFromCart(item.id)}>Remove From Cart</button>
                    </div>
                    ))}
                <p><b>Number of items in cart:</b> {cart.length}</p>
                <p><b>Price of items:</b> ${totalPrice.toFixed(2)}</p>
                <p><b>Tax:</b> ${currentTax.toFixed(2)}</p>
                <p className = "total"><b>Total:</b> ${(totalPrice + currentTax).toFixed(2)}</p>
    
            </div>

        </div>


    );
};

export default Cart;