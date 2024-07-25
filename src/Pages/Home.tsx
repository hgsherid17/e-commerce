import React from 'react';
import promos from '../data/promotions.json';
import Promotion from '../Components/Promotion.tsx';
import { PromoType } from '../types.ts';
import Menu from '../Pages/Menu.tsx';

interface HomeProperties {

}
const Home: React.FC<HomeProperties> = ()  => {
    return (
        <div className = "home">
            <div className = "promotions">
                <h1>Promos</h1>

                {
                    promos.length > 0 ? (
                    <div className="promoContainer">
                    {promos.map((item : PromoType) => (
                        <Promotion key= {item.id} item = {item}/>
                        ))}
                    </div>
                    ) :
                    (
                    <div className="404">
                        <h2>No promotions today</h2>
                    </div>
                    )
                }

            </div>

            <div className = "menuHome">
                < Menu />

            </div>
        </div>
    )
}

export default Home;