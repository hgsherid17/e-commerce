// POPUP SRC: GeeksForGeeks
import React from 'react';
import { FoodItemType } from '../types';

interface CartProperties {
    cart: FoodItemType[];
    totalPrice: number;
    currentTax: number;
    isOpen: boolean;
    toggle: () => void;
}

const Cart : React.FC<CartProperties> = ({cart, totalPrice, currentTax, isOpen, toggle}) => {
    return (
        <div className = "cart">
            <div className ="cartInfo">
                <h2>Cart: </h2>
                    {cart.map((item) => (
                    <div key={item.id}>
                        <p>{item.name} - ${item.price}</p>
                    </div>
                    ))}
                <p><b>Number of items in cart:</b> {cart.length}</p>
                <p><b>Price of items:</b> ${totalPrice.toFixed(2)}</p>
                <p><b>Tax:</b> ${currentTax.toFixed(2)}</p>
                <p className = "total"><b>Total:</b> ${(totalPrice + currentTax).toFixed(2)}</p>
            </div>

            <button className = "toggleCart" onClick={() => toggle()}>Close Cart</button>

        </div>


    );
};

export default Cart;