import React, { useContext } from 'react';
import { CreateContextData } from '../../Contexts/ContextData';
import { Link } from 'react-router-dom';
import './ProductTemp.css';
//import { createLoggedInContext } from '../../Contexts/LogInContext';

export default function ProuductTemp({ product }) {
  const { cart, addToCart, isloggedIn } = useContext(CreateContextData);
  //const {  } = useContext(createLoggedInContext);

  const checkProduct = (id) => {
    return cart.every((cartItem) => cartItem.id !== product.id);
  };

  return (
    <div className={'productTemp'}>
      <Link to={'/product/' + product.id}>
        <img src={product.image} alt="product-pic" className="product-pic" />
      </Link>
      <p>
        {product.title.length > 40
          ? `${product.title.substring(0, 50)} ...`
          : product.title}
      </p>
      <h2>&#8377; {product.price}</h2>
      {/*{checkProduct(product.id) ? (
        <button
          onClick={() => isloggedIn && addToCart(product.id)}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      ) : (
        <Link to="/cart" className="go-to-cart">
          <button>Go to cart</button>
        </Link>
      )}*/}
      {isloggedIn && !checkProduct(product.id) ? (
        <Link to="/cart" className="go-to-cart">
          <button>Go to cart</button>
        </Link>
      ) : (
        <button
          onClick={() => isloggedIn && addToCart(product.id)}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
