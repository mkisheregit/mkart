import React, { useContext, useState, useEffect } from 'react';
import { FcSearch } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';
import { CreateContextData } from '../../Contexts/ContextData';
//import { createLoggedInContext } from '../../Contexts/LogInContext';

export default function Navbar({ setSearch }) {
  const { cart, isloggedIn, toggleLogIn, setCart, setOrders } =
    useContext(CreateContextData);
  //const {  } = useContext(createLoggedInContext);

  const [totalItems, setTotalItems] = useState(cart.length);
  const [inputSearch, setInputSearch] = useState('');
  let navigate = useNavigate();

  const handleInput = (e) => {
    setInputSearch(e.target.value);
    !e.target.value && setSearch('');
  };

  const searchItem = (e) => {
    e.preventDefault();
    setSearch(inputSearch);
    console.log('Input', inputSearch);
    navigate('/');
  };

  const logout = () => {
    toggleLogIn(false);
    localStorage.removeItem('loggedInEmail');
    setCart([]);
    setOrders([]);
    navigate('/');
  };

  useEffect(() => {
    console.log('I am navbar');
    let total = cart.reduce((total, product) => total + product.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  return (
    <div className="navigation-bar">
      <Link to="/" className="brand link">
        <span>
          <h2 className="brand-name">M Kart</h2>
          <img
            src="Images/mkart_logo.png"
            className="brand-icon"
            alt="brand-icon"
          />
        </span>
      </Link>
      <div className="search-bar">
        <form>
          <input
            type="search"
            placeholder="search items"
            name="search"
            value={inputSearch}
            onChange={handleInput}
          />
          <button type="submit" onClick={searchItem} className="gif">
            <FcSearch />
          </button>
        </form>
      </div>
      {!isloggedIn ? (
        <Link exact to="/login" className="login link">
          <button>Log In / Sign Up</button>
        </Link>
      ) : (
        <button onClick={logout} className="logout-button">
          Log out
        </button>
      )}
      <Link exact to="/orders" className="orders link">
        <button>Your Orders</button>
      </Link>
      <Link exact to="/cart" className="cart link">
        <span>
          <FaShoppingCart className="cart-icon" />
          {isloggedIn && <b>{totalItems}</b>}
        </span>
      </Link>
      {isloggedIn && (
        <Link exact to="/user-profile" className="user-profile link">
          <FaUserCircle className="user-profile-icon" />
        </Link>
      )}
    </div>
  );
}
