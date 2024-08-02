import React from 'react';
import { NavLink } from 'react-router-dom';
import bagIcon from '../assets/bagIcon.svg';

interface NavBarProperties {
    toggleCart: () => void;
    cartCount: number;
}
const NavBar : React.FC<NavBarProperties> = ({ toggleCart, cartCount }) => {
    // const navigate = useNavigate();
    // <button className= "navToMenu" onClick={() => navigate('menu')}>Menu</button>

    return (
        <div className = "navBar">
            <img src="/images/logo.png"/>
            <NavLink className = {({ isActive }) => (isActive ? 'activeLink' : 'link')} to="/">Home</NavLink>
            <NavLink className = {({ isActive }) => (isActive ? 'activeLink' : 'link')} to="/menu">Menu</NavLink>
            <div className="cartContainer">
                <img className = "bagIcon" src={bagIcon} alt = "Open Cart" onClick={() => toggleCart()} />
                {
                    cartCount > 0 && 
                    <span className="cartCount">{cartCount}</span>
                }
            </div>
        </div>
    )
}

export default NavBar;