import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import SignUp from './Components/Sign-up/SignUp';
import UserProfile from './Components/User-profile/UserProfile';
import './App.css';

function App() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('I am app and loaded again');
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route exact path="/" element={<Home search={search} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
