import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
//import { createLoggedInContext } from '../../Contexts/LogInContext';
import { CreateContextData } from '../../Contexts/ContextData';

function Login({ message }) {
  const [formfields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const { toggleLogIn, handleLoggedInEmail } = useContext(CreateContextData);

  let navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    let subscribers = localStorage.getItem('subscribers')
      ? JSON.parse(localStorage.getItem('subscribers'))
      : [];
    if (subscribers.length > 0) {
      if (
        subscribers.every(
          (subscriber) =>
            !(
              subscriber.email === formfields.email &&
              subscriber.password === formfields.password
            )
        )
      ) {
        alert('Invalid Credentials');
        return;
      } else {
        console.log('...', formfields.email);
        handleLoggedInEmail(formfields.email);
        toggleLogIn(true);
      }
      setFormFields({
        email: '',
        password: '',
      });
      navigate('/');
    } else {
      alert('Not registered.Register first');
      navigate.push('/sign-up');
    }
  };

  return (
    <div className="login-component">
      <form action="">
        <p>{message}</p>
        <h1>Sign In</h1>
        <div className="input-field-container">
          <label for="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            className="email-input"
            placeholder="Enter email"
            value={formfields.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="input-field-container">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="password-input"
            placeholder="Enter password"
            value={formfields.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" onClick={handleFormSubmission}>
          Sign In
        </button>
        <p>Not registered yet? Register now</p>
        <Link exact to="/sign-up" className="link">
          Register now
        </Link>
      </form>
    </div>
  );
}

export default Login;
