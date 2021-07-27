import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './GalleryHeader.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { CartCheckFill } from 'react-bootstrap-icons';
import Checkout from '../Checkout/Checkout';

function GalleryHeader() {
  const history = useHistory();
  const user = useSelector(store => store.user);
  const cart = useSelector(store => store.cart);
  const storePrice = useSelector(store => store.cost.price);
  const storeTax = useSelector(store => store.cost.tax);
  const [modal, setModal] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setModal(true);
  }

  const addUpCart = (cart) => {
    let sum = 0;
    let tax = Number(storePrice * storeTax);
    let price = Number(storePrice);
    for (const image of cart) {
      sum += price + tax;
    }
    return sum.toFixed(2);
  }

  const resetCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_COST' })
  }, []);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
  }

  return (
    <>
      <Checkout
        modal={modal}
        setModal={setModal}
        handleShowModal={handleShowModal}
        total={total}
      />
      <div className="gallery-header shadow bg-primary d-flex justify-content-around align-items-center">

        <img
        id="galleryLogo"
          src="Brainerd_Horizontal_White_RGB.svg" alt="logo" height="100px" width="225"
          onClick={() =>{
            if (user.id === 2) {
              logout()
            }
            else{
              history.push('Admin/Orders');
            }
          }}
        />
        <div
          className="total-amount">
          <span
            className={Object.keys(cart).length === 0 ? "invisible" : "visible"}
          >${Object.keys(cart).length === 0 ? "00.00" : addUpCart(cart)}</span>
        </div>
        <div className="checkoutButtons">
          <ButtonGroup>
            <Button
              variant="dark"
              type="button"
              onClick={resetCart}
            >Clear</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                handleShowModal();
                setTotal(addUpCart(cart));
              }}
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