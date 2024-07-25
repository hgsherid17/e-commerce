import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';
import { CheckoutProperties } from '../types';

// SRC: https://www.dhiwise.com/post/the-ultimate-tutorial-for-integration-of-react-stripe-checkout

const stripe = loadStripe('pk_test_51PfQVNJyX9kTwHpnF6XHj3YwT3TTJnjSnJgGGxBAiMN7sBZStlX0DjR1IG7XYHVrBUK92mTsVHnvcmowu8zsCA2300QaNWapvJ');

const Checkout: React.FC<CheckoutProperties> = ( {cart, currentTax, totalPrice, setPaymentInfo} ) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const fetchClientSecret = async () => 
        {
            try {
                if (!clientSecret) {
                    console.log("HI! Creating Intent in CHECKOUT");
                    const response = await fetch('http://localhost:3301/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: totalPrice + currentTax }),
                    });

                    if (response.ok) {
                        const { clientSecret } = await response.json();
                        setClientSecret(clientSecret);
                    }
                    else {
                        console.error("Failed to fetch client secret")
                    }
                }
            } catch (error) {
                console.error("Error fetching client secret: " + error)
            }
        }

    useEffect(() => {
        fetchClientSecret();
    }, [totalPrice, currentTax]);

    return (
        <div>
        {clientSecret &&
            (<Elements stripe={stripe} options={{clientSecret: clientSecret}}>
            <CheckoutForm 
                cart = {cart} 
                currentTax= {currentTax} 
                totalPrice={totalPrice} 
                setPaymentInfo={setPaymentInfo} 
            />
        </Elements>)}
        </div>
    )
}

export default Checkout;