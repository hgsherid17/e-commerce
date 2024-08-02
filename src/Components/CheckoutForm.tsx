import React, { useState, ChangeEvent, act } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CheckoutProperties } from '../types';
//import { useNavigate } from 'react-router-dom';

/*interface PaymentConfirmationResult {
    error: StripeError | null
    paymentIntent: PaymentIntent | null
}
// SRC: Style element - https://docs.stripe.com/elements/appearance-api*/

const CheckoutForm : React.FC<CheckoutProperties> = ({ cart, currentTax, totalPrice, setPaymentInfo, actualTotal}) => {
    const stripe = useStripe();
    const elements = useElements();
    //const totalAmount = Math.round((currentTax + totalPrice));
    const totalAmount = currentTax + totalPrice;
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    

    // const [orderNumber, setOrderNumber] = useState<string | null>(null);

    const [formData, setFormData]= useState({
        name: "",
        email: ""
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
        elements?.submit();

        // No form submission unless stripe is enabled
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        /*

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
        }*/
        
        try {
                console.log("HI! CREATING INTENT");
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
                amount: totalAmount 
                });

                const { clientSecret } = response.data;

                // Confirm card payment
                const { error: confirmationError } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: 'http://localhost:5173/confirmation'
                    },
                    clientSecret
                });

                if (confirmationError) {
                    console.error(confirmationError);
                    return;
                }
                    console.log('Payment successful');

                    setPaymentInfo({
                        amount: totalAmount,
                        name: formData.name,
                        email: formData.email,
                        summary: cart
                    })

                    setLoading(false);
                

        } catch (error) {
                console.error("Error confirming card payment: " + error);
            }

    };

    const hasDiscount = cart.some(item => item.discount > 0);

    return (

        <div className = "checkoutForm">
            <h1>Checkout</h1>
            <h2><span>1</span> Customer Info</h2>
            <div className = "cusInfo">
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={change} required />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={change} required />
                </label>
            </div>

            <div className = "review">
            <h2><span>2</span> Review Order</h2>
            {cart.map((item) => (
                <div key={item.id} className = "checkoutItem">
                    <img src={item.image}></img>
                    <p><span className = "itemQuan">{item.quantity}x</span> {item.name}</p>
                    <p>{(item.price * item.quantity) - item.discount}</p>
                </div>
            ))}
            </div>

            <hr></hr>
            
            <p>Subtotal: {(actualTotal).toFixed(2)}</p>
            {
                hasDiscount && (
                    <p>Discount: -${(actualTotal - totalPrice).toFixed(2)}</p>
                )
            }
            <p>Tax: {(currentTax).toFixed(2)}</p>
            <p>Total: {(totalAmount).toFixed(2)}</p>


            <h2><span>3</span> Payment Information</h2>

            <div className="payInfoContainer">
                <form className = "payInfo" onSubmit={stripeSubmit}>
                        <PaymentElement />
                        <button type="submit" disabled={loading}>{loading ? 'Processing…' : 'Pay Now'}</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;