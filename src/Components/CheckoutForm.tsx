import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CheckoutProperties } from '../types';
//import { useNavigate } from 'react-router-dom';

/*interface PaymentConfirmationResult {
    error: StripeError | null
    paymentIntent: PaymentIntent | null
}
// SRC: Style element - https://docs.stripe.com/elements/appearance-api
const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      accessibleColorOnColorPrimary: '#262626'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input': {
        padding: '12px'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
};*/

const CheckoutForm : React.FC<CheckoutProperties> = ({ cart, currentTax, totalPrice, setPaymentInfo}) => {
    const stripe = useStripe();
    const elements = useElements();
    setPaymentInfo(null);
    //const totalAmount = Math.round((currentTax + totalPrice) * 100);
    const totalAmount = currentTax + totalPrice;
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    

    // const [orderNumber, setOrderNumber] = useState<string | null>(null);

    /*const [formData, setFormData]= useState({
        name: "",
        email: "",
        address: "",
        paymentMethod: ""
    });*/
    

    /*const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };*/

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
                const response = await axios.post('http://localhost:3301/create-payment-intent', {
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
                    /*setOrderNumber(orderNumber);
                    setPaymentInfo({
                        orderId: orderNumber,
                        amount: totalAmount.toFixed(2),
                        name: formData.name,
                        email: formData.email,
                        summary: cart
                    })*/

                    setLoading(false);
                

        } catch (error) {
                console.error("Error confirming card payment: " + error);
            }

    };
    
    return (

        <div>
            <h1>Checkout</h1>

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
                        <PaymentElement />
                        <button type="submit" disabled={loading}>{loading ? 'Processing…' : 'Pay Now'}</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;