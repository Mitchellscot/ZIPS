import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from '../GalleryItem/GalleryItem';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import Checkout from '../Checkout/Checkout';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { SRLWrapper } from "simple-react-lightbox";
import './Gallery.css';

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
      <GalleryHeader />
      <Checkout 
      modal={modal}
      setModal={setModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
      total={total}
      />
      
      <SRLWrapper>
        <Container>
      <div className="container galleryContainer">
        {gallery.map(image => {
          return (
            <ul key={image.id}>
              <GalleryItem image={image} />
            </ul>
          )
        })}
        </div>
        </Container>
        </SRLWrapper>
    </>
  );
}

export default Gallery;
