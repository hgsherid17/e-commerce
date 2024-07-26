import React from 'react';
import { useParams } from 'react-router-dom';
import { CartItemType } from '../types';


const Confirmation : React.FC<{paymentInfo: any}> = ({paymentInfo}) => {
    const { orderNumber } = useParams<{ orderNumber: string }>();

    if (!paymentInfo) {
        return <h1>Payment Successful!</h1>;
    }

    return (
        <div>
            <h1>Payment Successful!</h1>
            <h3>Thank you for your order.</h3>
            <p>Order Summary:</p>
            <p>Amount: {paymentInfo.amount}</p>
            <p>Name: {paymentInfo.name} </p>
            <p>Email: {paymentInfo.email}</p>
            <p>Items:</p>
            {paymentInfo.summary.map((item : CartItemType) => (
                <div key={item.id} className = "checkoutItem">
                    <img src={item.image}></img>
                    <p>{item.quantity}x {item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}

            
        </div>
    )
}
export default Confirmation;