import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';
import {useSelector} from 'react-redux';

function Header() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/gallery">
        <h2 className="nav-title">Brainerd Zip Line Tour</h2>
      </Link>
      <div>
      </div>
    </div>
  );
}

export default Header;
