import React from 'react';
import { useParams } from 'react-router-dom';


const Confirmation : React.FC<{paymentInfo: any}> = ({paymentInfo}) => {
    const { orderNumber } = useParams<{ orderNumber: string }>();

    return (
        <div>
            <h1>Payment Successful!</h1>
            <h3>Thank you for your order.</h3>
            <p>Order Summary:</p>
            <p>Order Number: {orderNumber}</p>
            <p>Amount: {paymentInfo.amount}</p>
            <p>Name: {paymentInfo.name} </p>
            <p>Email: {paymentInfo.email}</p>
            
        </div>
    )
}
export default Confirmation;