import React, {useEffect, useState} from 'react';
//import { useParams } from 'react-router-dom';
import { CartItemType } from '../types';


const Confirmation : React.FC<{amount: number, cart:CartItemType[]}> = ({amount, cart}) => {
    const [paymentInfo, setPaymentInfo] = useState<any>(null);
    //const [carts, setCart] = useState<CartItemType[]>([]);
    amount = 0;

    useEffect(() => {
        const info = sessionStorage.getItem('paymentInfo');
        if (info) {
            const parsedInfo = JSON.parse(info);
            setPaymentInfo(parsedInfo);
            //setCart(parsedInfo.summary || []);
            sessionStorage.removeItem('paymentInfo'); // Clean up
        }
    }, []);

    if (!paymentInfo) {
        return <h1>Payment Successful!</h1>;
    }

    return (
        <div>
            <h1>Payment Successful!</h1>
            <h3>Thank you for your order.</h3>
            <h3>Order Summary:</h3>
            <p><b>Name:</b> {paymentInfo.name}</p>
            <p><b>Email:</b> {paymentInfo.email}</p>
            <p><b>Amount:</b> ${(paymentInfo.amount || 0).toFixed(2)}</p>

            <p><b>Items:</b></p>
            {paymentInfo.summary.map((item: CartItemType) => (
                <div key={item.id} className="checkoutItem">
                    <img src={item.image} alt={item.name} />
                    <p>{item.quantity}x {item.name}</p>
                    <p>${(item.price * item.quantity - item.discount).toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}
export default Confirmation;