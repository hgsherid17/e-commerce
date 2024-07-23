import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CartItemType } from '../types';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

interface CheckoutFormProperties {
    totalAmount: number;
}

const CheckoutForm : React.FC<CheckoutFormProperties> = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const stripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // No form submission unless stripe is enabled
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (paymentMethodError) {
            console.error(paymentMethodError);
            return;
        }


        try {
                const response = await axios.post('http://localhost:3301/create-payment-intent', {
                amount: totalAmount, // Convert to cents and round 
                });

                const { clientSecret } = response.data;

                // Confirm card payment
                const { error: confirmationError, paymentIntent } =  await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

                if (confirmationError) {
                    console.error(confirmationError);
                    return;
                }

                if (paymentIntent.status === 'succeeded') {
                    console.log('Payment successful');
                    window.location.href = '/confirmation';
                }

        } catch (error) {
                console.error("Error confirming card payment: " + error);
            }

    };
    
    return (
        <form onSubmit={stripeSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

export default CheckoutForm;