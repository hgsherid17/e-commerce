import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CartItemType } from '../types';

interface CheckoutProperties {
    cart: CartItemType[];
    currentTax: number;
    totalPrice: number;
}

const Checkout: React.FC<CheckoutProperties> = ( {cart, currentTax, totalPrice} ) => {

    const [formData, setFormData]= useState({
        name: "",
        address: "",
        paymentMethod: ""
    });

    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const submit = (e: FormEvent) => {
        return "Yass";
      };
    
    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={submit}>

            <h2><span>1</span> Deliver To</h2>
            <div>
                <label>
                    Address:
                    <textarea name="address" value={formData.address} onChange={change} required />
                </label>
            </div>

            <h2><span>2</span> Customer Info</h2>
            <div>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={change} required />
                </label>
            </div>

            <h2><span>3</span> Payment Method</h2>
            <div>
                <label>
                    Payment Method:
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={change} required>
                        <option value="creditCard">Credit Card</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </label>
            </div>

            <h2><span>4</span> Review Order</h2>
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

            <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Checkout;