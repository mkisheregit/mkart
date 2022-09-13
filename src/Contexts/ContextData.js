import { createContext, useEffect, useState } from 'react';

export const CreateContextData = createContext();

const ProviderContextData = ({ children }) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  const toggleLogIn = (bool) => {
    setIsLoggedIn(bool);
  };
  const handleLoggedInEmail = (email) => {
    setLoggedInEmail(email);
  };

  /* ADD ITEMS TO THE CART */
  const addToCart = (id) => {
    let ls_cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    let newCartItem = data.filter((product) => product.id === id)[0];
    newCartItem = { ...newCartItem, quantity: 1 };

    if (ls_cart.length > 0) {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          ...ls_cart.filter((obj) => obj.email !== loggedInEmail),
          { email: loggedInEmail, cart: [...cart, newCartItem] },
        ])
      );
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ email: loggedInEmail, cart: [...cart, newCartItem] }])
      );
    }
    setCart((prevCart) => {
      return [...prevCart, newCartItem];
    });
  };

  /**DONE: CHANGE QUANTITY OF THE CART'S ITEM */
  const changeQuantity = (id, newQuantity) => {
    let updatedCart = cart.map((item) => {
      if (item.id === id) {
        item['quantity'] = newQuantity;
      }
      return item;
    });

    /**
     * Another Method
     *
     */

    let ls_cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    if (ls_cart.length > 0) {
      ls_cart = ls_cart.map((obj) => {
        if (obj.email === loggedInEmail) {
          obj['cart'] = obj['cart'].map((item) => {
            if (item.id === id) {
              item['quantity'] = newQuantity;
            }
            return item;
          });
        }
        return obj;
      });
      localStorage.setItem('cart', JSON.stringify(ls_cart));
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ email: loggedInEmail, cart: updatedCart }])
      );
    }
    setCart(updatedCart);
  };

  /**DELETE ITEM FROM THE CART */
  const removeFromCart = (id) => {
    let updatedCart = cart.filter((item) => item.id !== id);

    let ls_cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    if (ls_cart.length > 0) {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          ...ls_cart.filter((obj) => obj.email !== loggedInEmail),
          { email: loggedInEmail, cart: updatedCart },
        ])
      );
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ email: loggedInEmail, cart: updatedCart }])
      );
    }
    setCart(updatedCart);
  };

  /**DONE: Empty Cart whether on checkout  */
  const emptyCart = () => {
    let ls_cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    ls_cart = ls_cart.map((obj) => {
      if (obj.email === loggedInEmail) {
        obj.cart = [];
      }
      return obj;
    });

    localStorage.setItem('cart', JSON.stringify(ls_cart));
    setCart([]);
  };

  /** DONE: PUSH NEW ORDER TO ORDERS */
  const placeOrders = (newOrder) => {
    let ls_orders = localStorage.getItem('orders')
      ? JSON.parse(localStorage.getItem('orders'))
      : [];

    if (ls_orders.length > 0) {
      localStorage.setItem(
        'orders',
        JSON.stringify([
          ...ls_orders.filter((obj) => obj.email !== loggedInEmail),
          { email: loggedInEmail, ordersHistory: [...orders, newOrder] },
        ])
      );
    } else {
      localStorage.setItem(
        'orders',
        JSON.stringify([
          { email: loggedInEmail, ordersHistory: [...orders, newOrder] },
        ])
      );
    }
    setOrders((prevOrders) => {
      return [...prevOrders, newOrder];
    });
  };

  /**FETCH ALL DATA OF API */
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });

    let ls_cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    let ls_orders = localStorage.getItem('orders')
      ? JSON.parse(localStorage.getItem('orders'))
      : [];

    let loggedInEmail = localStorage.getItem('loggedInEmail')
      ? JSON.parse(localStorage.getItem('loggedInEmail'))
      : '';
    console.log('ls_cart', ls_cart);
    console.log('ls_orders', ls_orders);

    if (loggedInEmail) {
      if (ls_cart.length > 0) {
        let getUserCart = ls_cart.filter((obj) => obj.email === loggedInEmail);
        getUserCart.length > 0 && setCart(getUserCart[0].cart);
        console.log('inside useEff, cart:', getUserCart);
      }
      if (ls_orders.length > 0) {
        let getUserOrders = ls_orders.filter(
          (obj) => obj.email === loggedInEmail
        );
        getUserOrders.length > 0 &&
          setOrders(getUserOrders[0]['ordersHistory']);
        console.log('inside useEff, orders:', getUserOrders);
        //handleOrders(getUserOrders[0].ordersHistory);
      }
      toggleLogIn(true);
      handleLoggedInEmail(loggedInEmail);
    } else {
      toggleLogIn(false);
      //handleLoggedInEmail(loggedInEmail);
    }
  }, []);

  return (
    <CreateContextData.Provider
      value={{
        data,
        cart,
        orders,
        isloggedIn,
        loggedInEmail,
        setCart,
        setOrders,
        addToCart,
        changeQuantity,
        removeFromCart,
        placeOrders,
        emptyCart,
        toggleLogIn,
        handleLoggedInEmail,
      }}
    >
      {children}
    </CreateContextData.Provider>
  );
};

export default ProviderContextData;
