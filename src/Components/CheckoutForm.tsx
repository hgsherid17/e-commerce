import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CartItemType } from '../types';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CheckoutProperties } from '../types';
import { useNavigate } from 'react-router-dom';

const CheckoutForm : React.FC<CheckoutProperties> = ({ cart, currentTax, totalPrice, setPaymentInfo}) => {
    const stripe = useStripe();
    const elements = useElements();
    const totalAmount = currentTax + totalPrice;
    const navigate = useNavigate();

    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    const [formData, setFormData]= useState({
        name: "",
        email: "",
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
            billing_details: {
                name: formData.name,
                email: formData.email,
                address: {
                    line1: formData.address
                }
            }
        });

        if (paymentMethodError) {
            console.error(paymentMethodError);
            return;
        }
        
        try {
                const response = await axios.post('http://localhost:3301/create-payment-intent', {
                amount: totalAmount
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
                    //setOrderNumber(orderNumber);
                    setPaymentInfo({
                        orderId: paymentIntent.id,
                        amount: totalAmount.toFixed(2),
                        name: formData.name,
                        email: formData.email,
                        summary: cart
                    })

                    navigate(`/confirmation/${paymentIntent.id}`);
                }

        } catch (error) {
                console.error("Error confirming card payment: " + error);
            }

    };
    
    return (

        <div>
            <h1>Checkout</h1>

            <h2><span>1</span> Delivery Information</h2>
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
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={change} required />
                </label>
            </div>

            <h2><span>3</span> Review Order</h2>
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
            <p>Total: {(totalAmount).toFixed(2)}</p>


            <h2><span>4</span> Payment Information</h2>

            <div>
                <form onSubmit={stripeSubmit}>
                        <CardElement />
                        <button type="submit" disabled={!stripe}>Pay</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;