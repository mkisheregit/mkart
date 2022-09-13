import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({});
  useEffect((data) => {
    let loggedInEmail = JSON.parse(localStorage.getItem('loggedInEmail'));
    let subscribers = JSON.parse(localStorage.getItem('subscribers'));
    let loggedInUser = subscribers.filter(
      (user) => user.email === loggedInEmail
    )[0];
    setUser(loggedInUser);
  }, []);
  return (
    <div className="user-profile-comp">
      <FaUserCircle className="user-profile" />
      <div>
        <p className="label">UserName</p>
        <p className="info">{user.username}</p>
      </div>
      <div>
        <p className="label">Email</p>
        <p className="info">{user.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
