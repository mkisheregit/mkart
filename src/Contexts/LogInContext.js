import React, { createContext, useEffect, useState } from 'react';

export const createLoggedInContext = createContext();

const LoggedInContextProvider = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const toggleLogIn = (bool) => {
    setIsLoggedIn(bool);
  };
  const handleLoggedInEmail = (email) => {
    setLoggedInEmail(email);
  };
  useEffect(() => {
    if (localStorage.getItem('loggedInEmail')) {
      setIsLoggedIn(true);
    }
  }, [isloggedIn]);

  return (
    <createLoggedInContext.Provider
      value={{ isloggedIn, loggedInEmail, handleLoggedInEmail, toggleLogIn }}
    >
      {children}
    </createLoggedInContext.Provider>
  );
};
export default LoggedInContextProvider;
