import React, { useContext, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { createLoggedInContext } from '../../Contexts/LogInContext';

function SignUp() {
  const [formfields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { toggleLogIn } = useContext(createLoggedInContext);

  let navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formfields, [name]: value });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    let subscribers;

    subscribers = localStorage.getItem('subscribers')
      ? JSON.parse(localStorage.getItem('subscribers'))
      : [];

    if (
      subscribers.length > 0 &&
      subscribers.filter((subscriber) => subscriber.email === formfields.email)
        .length > 0
    ) {
      alert('Subscriber already exists');
      return;
    }

    subscribers.push(formfields);

    console.log(subscribers);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    localStorage.setItem('loggedInEmail', JSON.stringify(formfields.email));
    toggleLogIn(true);
    navigate('/');
    setFormFields({ username: '', email: '', password: '' });
  };

  return (
    <div className="signup-component">
      <form>
        <h1>Sign Up</h1>
        <div className="input-field-container">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="username-input"
            placeholder="Enter Username"
            minLength={4}
            value={formfields.username}
            onChange={handleInput}
            required
          />
        </div>
        <div className="input-field-container">
          <label for="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            className="email-input"
            placeholder="Enter email"
            minLength={4}
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
            minLength={5}
            value={formfields.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" onClick={handleFormSubmission}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
