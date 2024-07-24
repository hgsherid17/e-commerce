// POPUP SRC: GeeksForGeeks
import React, { SetStateAction } from 'react';
import { CartItemType } from '../types';
import { Link } from 'react-router-dom';

interface CartProperties {
    cart: CartItemType[];
    totalPrice: number;
    currentTax: number;
    cartCount: number;
    toggle: () => void;
    removeFromCart: (id: number, quantity: number) => void;
    addToCart: (id: number) => void;
}

const Cart : React.FC<CartProperties> = ({cart, totalPrice, currentTax, cartCount, toggle, removeFromCart, addToCart}) => {

    // TODO: Is there a way to do this in App? Or move variables like this to this component?
    const increment = (item: CartItemType) => {
        if (item.quantity < 20) {
            addToCart(item.id);
        }

    }

    const decrement = (item: CartItemType) => {
        if (item.quantity > 0) {
            removeFromCart(item.id, item.quantity - 1);
        }
    }

    return (
        <div className = "cart">

            <button className = "toggleCart" onClick={() => toggle()}>X</button>

            {cartCount === 0 && (
                <>
                <div className = "cartSummary">
                <h2>My Cart</h2>
                </div>
                <hr></hr>
                <div className ="nothingInCart">
                    <h2>There's nothing in your cart.</h2>
                    <p>Start adding items to satisfy your hunger!</p>
                </div>
                </>
            )}
            { cartCount != 0 && (
                <>
                <div className = "cartSummary">
                    <h2>My Cart</h2>
                    <p className = "numItems">{ cartCount } {cartCount == 1 ? "Item" : "Items"}</p>
                    <div className = "total">
                        <p>Total</p>
                        <p>${(totalPrice).toFixed(2)}</p>
                    </div>
                </div>
                <hr></hr>
                    <div className="cartItems">
                        {cart.map((item) => (
                        <div key={item.id} className="cartItem">
                            <div className="itemInfo">
                                <img src={item.image}></img>
                                <div className="cartItemDetails">
                                    <b><p className ="name">{item.name}</p></b>
                                    <p className="number">${Number(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className ="itemControls">
                                <div className = "quantity">
                                    <button
                                        onClick={() => decrement(item)}
                                        disabled={item.quantity <= 1}
                                        className={item.quantity <= 1 ? 'disabled' : ''}
                                    >-</button>

                                    <p>{item.quantity}</p>

                                    <button
                                        onClick={() => increment(item)}
                                        disabled={item.quantity >= 20}
                                        className={item.quantity >= 20 ? 'disabled' : ''}
                                    >+</button>

                                </div>

                                <button className = "removeFromCart" onClick = {() => removeFromCart(item.id, item.quantity)}>Remove</button>

                            </div>
                        </div>
                        ))}
                    </div>
                
                    
                <hr></hr> 
                <p>Subtotal: ${(totalPrice).toFixed(2)}</p>
                <p>Tax: ${(currentTax).toFixed(2)}</p>
                <p>Total: ${(totalPrice + currentTax).toFixed(2)}</p>

                <button><Link to="/checkout">Checkout</Link></button>
                    </>
                )}
                
    
            </div>




    );
};

export default Cart;