// POPUP SRC: GeeksForGeeks
import React , {useCallback, useEffect} from 'react';
import { CartItemType } from '../types';
import { Link } from 'react-router-dom';
import promos from '../data/promotions.json';
import foodItems from '../data/foodItems.json';

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

    const getCategoryByItemId = (itemId: number): number | undefined => {
        for (const categoryKey in foodItems) {
            const category = foodItems[categoryKey as keyof typeof foodItems];
            if (category.items.some(item => item.id === itemId)) {
                return category.id;
            }

        }
        return undefined;
    };

    const applyPromotion = () => {
        // Loop through promos
        for (const item of cart) {

            const categoryId = getCategoryByItemId(item.id);

    
            if (categoryId) {
                for (const promo of promos) {
                    if (promo.applicableItems.includes(categoryId)) {
                        if (promo.type === "BOGO") {
                            console.log("Here is item: " + item.name + " and promo: " + promo.type);

                        }
                        if (promo.type === "FREEITEM") {
                            console.log("Here is item: " + item.name + " and promo: " + promo.type);

                        }


                    }
                }
            }
            

        }
    }
        // The complexity is crazy here
        /*for (let i = 0; i < promos.length; i++) {
            for (const categoryKey in promos[i].applicableItems) {
                const items = getCategoryItems(parseInt(categoryKey));
                for (const item in items) {
                    
                }
            }
        }*/
        // Find category.items

        
        // If promo.type === BOGO
            // If item.quantity >= 2
                // If item.quantity % 2 === 0
                    // BOGOPROMOPRICE = item.totalPrice / 2
                    // Print promo applied
                // Else [item.quantity - 1 % 2 === 0]
                    // BOGOPROMOPRICE = item.price - 1 * item.quantity / 2
            // Else
                // Unapplicable, print (would you like to buy one get one free?
                // Link to applicableitems/:promoId
    
        // If promo.type === FREEITEM
            // 
    
        // Apply promotion
    
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
                    <div className="sadBurger">
                        <img src="/images/sad_burger.png" />
                    </div>
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
                                    <p className="number">${Number((item.price * item.quantity) - item.discount).toFixed(2)}</p>
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