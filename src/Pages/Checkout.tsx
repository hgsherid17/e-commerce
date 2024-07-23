import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CartItemType } from '../types';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

// SRC: https://www.dhiwise.com/post/the-ultimate-tutorial-for-integration-of-react-stripe-checkout

const stripe = loadStripe('pk_test_51PfQVNJyX9kTwHpnF6XHj3YwT3TTJnjSnJgGGxBAiMN7sBZStlX0DjR1IG7XYHVrBUK92mTsVHnvcmowu8zsCA2300QaNWapvJ');

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

    const stripe = useStripe();
    const elements = useElements();

    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();

        // No form submission unless stripe is enabled
        if (!stripe || !elements) {
            return;
        }

    };
    
    return (
        <Elements stripe={stripe}>
        <div>
            <h1>Checkout</h1>

            <h2><span>4</span> Review Order</h2>
            {cart.map((item) => (
                <div key={item.id} className = "checkoutItem">
                    <img src={item.image}></img>
                    <p>{item.quantity}x {item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}
            <hr></hr>
            <p>Subtotal: {(totalPrice).toFixed(2)}</p>
            <p>Tax: {(currentTax).toFixed(2)}</p>
            <p>Total: {(totalPrice + currentTax).toFixed(2)}</p>


            <CheckoutForm totalAmount = {totalPrice + currentTax} />

        </div>
        </Elements>
    )
}

export default Checkout;