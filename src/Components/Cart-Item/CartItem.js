import React, { useContext } from 'react';
import { CreateContextData } from '../../Contexts/ContextData';
import './CartItem.css';
import { Link } from 'react-router-dom';

function CartItem({ product }) {
  const { changeQuantity, removeFromCart } = useContext(CreateContextData);

  return (
    <>
      <div className="grid-item-1">
        <Link exact to={'/product/' + product.id} className="cart-item-link">
          <img src={product.image} alt="product-pic" />
        </Link>
        <h4>{product.title}</h4>
        <button onClick={() => removeFromCart(product.id)}>remove</button>
      </div>
      <p className="grid-item-2"> &#8377;{product.price}</p>
      <div className="grid-item-3">
        <button
          onClick={() =>
            product.quantity <= 1
              ? changeQuantity(product.id, 1)
              : changeQuantity(product.id, product.quantity - 1)
          }
        >
          -
        </button>
        <button disabled>{product.quantity}</button>
        <button
          onClick={() => changeQuantity(product.id, product.quantity + 1)}
        >
          +
        </button>
      </div>
      <p className="grid-item-4">&#8377; {product.price * product.quantity}</p>
      <hr />
    </>
  );
}

export default CartItem;
