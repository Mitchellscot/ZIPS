import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './GalleryHeader.css';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';

function Header() {
  const user = useSelector((store) => store.user);
  const cart = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const addUpCart = (cart) =>{
    let sum=0;
    for (const image of cart){
      sum += 5
    }
    return sum.toFixed(2);
  }

  const resetCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  return (
    <div className="gallery-header">
      <Link to="/gallery">
        <h2 className="nav-title">Brainerd Zip Line Tour</h2>
      </Link>
      <div>
      <Button 
      variation="outline-dark"
      type="button"
        onClick={resetCart}
        >Clear Cart</Button>
      <span>${Object.keys(cart).length === 0 ? "0.00" : addUpCart(cart)}</span>
      </div>
    </div>
  );
}

export default Header;