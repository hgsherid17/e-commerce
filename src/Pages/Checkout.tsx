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

                    console.log(import.meta.env.VITE_BACKEND_URL)
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ amount: totalPrice + currentTax }),
                    });

                    const {clientSecret} = await response.json(); // Get response as text
                    console.log(clientSecret);
            // try {
            //     const json = JSON.parse(text);
            //     setClientSecret(json.clientSecret);
            // } catch (e) {
            //     console.error('Failed to parse JSON:', e); // Log response if JSON parsing fails
            // }

                    if (response.ok) {
                        setClientSecret(clientSecret);
                    }
                    else {
                        console.error("Failed to fetch client secret: ", response.statusText)
                    }
                }
            } catch (error) {
                console.error("Error fetching client secret: " + error)
            }
        }

    useEffect(() => {
        fetchClientSecret();
    }, []);

    return (
        <div>
        {clientSecret && (
            <Elements stripe={stripe} options={{clientSecret}}>
                <CheckoutForm 
                    cart = {cart} 
                    currentTax= {currentTax} 
                    totalPrice={totalPrice} 
                    setPaymentInfo={setPaymentInfo} 
                />
            </Elements>
        )}
        </div>
    )
}

export default Checkout;