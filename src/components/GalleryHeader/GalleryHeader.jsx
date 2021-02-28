import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './GalleryHeader.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { CartCheckFill } from 'react-bootstrap-icons';
import Checkout from '../Checkout/Checkout';
import Modal from 'react-bootstrap/Modal';

function GalleryHeader() {
  const history = useHistory();
  const cart = useSelector(store => store.cart);
  const [modal, setModal] = React.useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setModal(true);
  }
  const handleCloseModal = () => {
    setModal(false);
  }

  const addUpCart = (cart) => {
    let sum = total
    for (const image of cart) {
      sum += 5
    }
    setTotal(sum);
    return total.toFixed(2);
  }

  const resetCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <>
      <Checkout
        modal={modal}
        setModal={setModal}
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        total={total}
      />
      <div className="gallery-header shadow bg-primary d-flex justify-content-around align-items-center">

        <img
          src="Brainerd_Horizontal_White_RGB.svg" alt="logo" height="100px" width="225"
          onClick={history.go}
        />

        <div
          className="total-amount">
          <span
            className={Object.keys(cart).length === 0 ? "invisible" : "visible"}
          >${Object.keys(cart).length === 0 ? "00.00" : addUpCart(cart)}</span>
        </div>
        <div className="checkoutButtons">
          <ButtonGroup className={Object.keys(cart).length === 0 ? "invisible" : "visible"}>
            <Button
              variant="dark"
              type="button"
              onClick={resetCart}
            >Clear</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleShowModal}
            >Checkout&nbsp;
          <CartCheckFill
                fontSize="1.2rem"
              />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default GalleryHeader;