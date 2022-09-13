import React, { useState, useContext, useEffect } from 'react';
import { CreateContextData } from '../../Contexts/ContextData';
import CartItem from '../Cart-Item/CartItem';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
//import { createLoggedInContext } from '../../Contexts/LogInContext';
import Login from '../Login/Login';

function Cart() {
  const { cart, orders, placeOrders, emptyCart, isloggedIn } =
    useContext(CreateContextData);
  //const { isloggedIn } = useContext(createLoggedInContext);

  const [totalItems, setTotalItems] = useState(cart.length);
  const [subTotal, setSubTotal] = useState(cart.length);

  const navigate = useNavigate();

  useEffect(() => {
    let total = cart.reduce((total, product) => total + product.quantity, 0);
    setTotalItems(total);
    let subTotal = cart.reduce(
      (subTotal, product) => subTotal + product.quantity * product.price,
      0
    );
    setSubTotal(subTotal);
  }, [cart]);

  const checkout = () => {
    let newOrder = {
      id: orders.length + 1,
      time: new Date().toLocaleDateString(),
      totalQuantity: totalItems,
      subTotal: subTotal.toFixed(2),
      items: cart,
    };
    placeOrders(newOrder);
    emptyCart();
    navigate('/orders');

    console.log('orders', orders);
  };
  if (isloggedIn) {
    if (cart.length > 0)
      return (
        <div className="cart">
          <h1> Shopping Cart</h1>
          <h4>total items: {totalItems}</h4>
          <div className="description-header">
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Total</h4>
          </div>
          <hr />
          {cart.map((product) => {
            return (
              <>
                <div className="cart-item-details">
                  <CartItem product={product} />
                </div>
                <hr />
              </>
            );
          })}
          <div className="sub-total">
            <p>SubTotal:</p>
            <p>&#8377; {subTotal.toFixed(2)}</p>
          </div>
          <div className="check-out">
            <button onClick={checkout}>CheckOut</button>
          </div>
          <div className="empty-cart">
            <button onClick={emptyCart}>Empty Cart</button>
          </div>
        </div>
      );
    else {
      return (
        <div className="no-item-in-cart">
          <h3>Your cart is Empty</h3>
          <Link to="/" className="link-to-home">
            Add items to your cart
          </Link>
        </div>
      );
    }
  } else {
    return <Login message={'Login first to see cart items'} />;
  }
}

export default Cart;
