import React from 'react';
import { PromoType } from '../types';
import { Link } from 'react-router-dom';

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

            <Link className='menuLink' to = {`/applicable-items/${item.id}`}>View Applicable Items</Link>

        </div>
    );
}
export default Promotion;