import React, { useContext } from 'react';
import { CreateContextData } from '../../Contexts/ContextData';
import Order from '../Order/Order';
import './Orders.css';
import { Link } from 'react-router-dom';
//import { createLoggedInContext } from '../../Contexts/LogInContext';
import Login from '../Login/Login';

function Orders() {
  const { orders, isloggedIn } = useContext(CreateContextData);
  //const {  } = useContext(createLoggedInContext);
  console.log(typeof orders);

  if (isloggedIn) {
    if (orders.length > 0)
      return (
        <div className="orders-comp">
          {orders.map((order, idc) => {
            return (
              <>
                <Order order={order} key={order.id} />
                <hr />
              </>
            );
          })}
        </div>
      );
    else {
      return (
        <div className="empty-orders-section">
          <h3>We are waiting for your first Order.</h3>
          <Link to="/" className="link-to-home">
            Add items to cart and order.
          </Link>
        </div>
      );
    }
  } else {
    return <Login message={"Login first to see your orders' history"} />;
  }
}

export default Orders;
