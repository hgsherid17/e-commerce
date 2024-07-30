import React, { useEffect } from 'react';
import promos from '../data/promotions.json';
import foodItems from '../data/foodItems.json';
import { FoodItemType } from '../types';
import FoodItem from '../Components/FoodItem';
import { useParams } from 'react-router-dom';

interface ApplicablePromoItemsProperties {
    addToCart: (id: number) => void;
    applicableItems: FoodItemType[];
    setApplicableItems: React.Dispatch<React.SetStateAction<FoodItemType[]>>;
    
}
const ApplicablePromoItems : React.FC<ApplicablePromoItemsProperties> = ({ addToCart, applicableItems, setApplicableItems }) => {
    console.log("WE ARE HERE");
    const { id } = useParams<{ id: string }>();

    const getApplicableItems = (promoId : number) => {
        console.log("IN FUNCTION NOW");
        // Get promo with given id
        const promo = promos.find(item => item.id === promoId);

        // Get promo applicable items
        const applicableItemIds = promo?.applicableItems;

        // Get applicable items from foodItems
        setApplicableItems([]);
        
        for ( let i = 0; i < Object.keys(foodItems).length; i++) {
            const categoryKey = Object.keys(foodItems)[i];
            const category = foodItems[categoryKey as keyof typeof foodItems]
            
            if (applicableItemIds?.includes(category.id)) {
                setApplicableItems(prevItems => [...prevItems, ...category.items])
            }

        }

    }

    useEffect(() => {
        if (id) {
            getApplicableItems(parseInt(id));
        }

    }, [id])
    

    return (
        <div className = "container">
            {
                applicableItems.map((item : FoodItemType) => (
                    <FoodItem key={item.id} item={item} addToCart={addToCart} />
                ))
            }

        </div>
    )
}

export default ApplicablePromoItems;