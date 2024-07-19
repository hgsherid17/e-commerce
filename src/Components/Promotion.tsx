import React from 'react';
import { PromoType } from '../types';

interface PromotionProperties {
    item: PromoType;
}

const Promotion : React.FC<PromotionProperties> = ({item}) => {

    // REMINDER: add button to view applicable items
    return (
        <div className = "promoItem">
            
            <div className = "promoInfo">
                <h2>{item.description}</h2>
            </div>
            
            <div className = "promoImage">
                <img src={item.image !== "N/A" ? item.image : "./images/default.jpg"}/>
            </div>

            <button>View Applicable Items</button>

        </div>
    );
}
export default Promotion;