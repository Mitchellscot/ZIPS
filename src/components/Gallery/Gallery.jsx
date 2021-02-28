import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from '../GalleryItem/GalleryItem';
import Checkout from '../Checkout/Checkout';
import Button from 'react-bootstrap/Button';
import { SRLWrapper } from "simple-react-lightbox";
import Footer from '../Footer/Footer';

function Gallery() {
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const gallery = useSelector(store => store.gallery);
  const cart = useSelector(store => store.cart);

  const handleShowModal = () => {
    setModal(true);
  }
  const handleCloseModal = () => {
    setModal(false);
  }

  const addUpCart = (cart) => {
    let sum = 0;
    for (const image of cart) {
      sum += 5
    }
    Number(sum.toFixed(2));
    setTotal(sum);
    return sum;
  }

  React.useEffect(() => {
    dispatch({ type: 'FETCH_GALLERY' })
  }, []);

  return (
    <>

      <Checkout 
      modal={modal}
      setModal={setModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
      total={total}
      />
      
      <SRLWrapper>
      <div className="container">
        {gallery.map(image => {
          return (
            <ul key={image.id}>
              <GalleryItem image={image} />
            </ul>
          )
        })}
        </div>
        </SRLWrapper>
      <Footer 
      addUpCart={addUpCart}
      handleShowModal={handleShowModal}
      cart={cart}
      />
      <div className="push"></div>
    </>
  );
}

export default Gallery;
