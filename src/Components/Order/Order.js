import React from 'react';
import { Link } from 'react-router-dom';
import './Order.css';
function Order({ order }) {
  return (
    <div className="ordered-item">
      <h1 className="order-id">Order:{order.id}</h1>
      <div className="order-brief-desc">
        <div>
          Total Items: <h4>{order.totalQuantity}</h4>
        </div>
        <div>
          Total Amount Paid: <h4> &#8377; {order.subTotal}</h4>
        </div>
      </div>
      <div className="order-items-details">
        {order.items.map((item, idx) => {
          return (
            <div key={idx} className="single-item">
              <Link exact to={'/product/' + item.id}>
                <img
                  src={item.image}
                  alt="ordered-item-pic"
                  className="ordered-item-pic"
                />
              </Link>

              <p>price/item: &#8377; {item.price}</p>
              <hr />
              <p>total items: {item.quantity}</p>
              <p>total price: &#8377; {item.quantity * item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
