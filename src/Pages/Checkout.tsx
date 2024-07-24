import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CartItemType } from '../types';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';
import { CheckoutProperties } from '../types';

// SRC: https://www.dhiwise.com/post/the-ultimate-tutorial-for-integration-of-react-stripe-checkout

const stripe = loadStripe('pk_test_51PfQVNJyX9kTwHpnF6XHj3YwT3TTJnjSnJgGGxBAiMN7sBZStlX0DjR1IG7XYHVrBUK92mTsVHnvcmowu8zsCA2300QaNWapvJ');

const Checkout: React.FC<CheckoutProperties> = ( {cart, currentTax, totalPrice, setPaymentInfo} ) => {
    
    return (
        <Elements stripe={stripe}>
        <div>
            <CheckoutForm cart = {cart} currentTax= {currentTax} totalPrice={totalPrice} setPaymentInfo={setPaymentInfo} />
        </div>
        </Elements>
    )
}

export default Checkout;