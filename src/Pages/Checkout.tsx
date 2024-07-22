import React from 'react';
import { CartItemType } from '../types';
import { isInputElement } from 'react-router-dom/dist/dom';

interface CheckoutProperties {
    cart: CartItemType[];
    currentTax: number;
    totalPrice: number;
}

const Checkout: React.FC<CheckoutProperties> = ( {cart, currentTax, totalPrice} ) => {
    return (
        <div>
            <h1>Checkout</h1>

            <h2>Review Order</h2>
            {cart.map((item) => (
                <div className = "checkoutItem">
                    <img src={item.image}></img>
                    <p>{item.quantity}x {item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}
            <hr></hr>
            <p>Subtotal: {(totalPrice).toFixed(2)}</p>
            <p>Tax: {(currentTax).toFixed(2)}</p>
            <p>Total: {(totalPrice + currentTax).toFixed(2)}</p>
        </div>
    )
}

export default Checkout;