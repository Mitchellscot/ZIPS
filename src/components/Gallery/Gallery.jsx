import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from '../GalleryItem/GalleryItem';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import Checkout from '../Checkout/Checkout';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
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
      <GalleryHeader 
      
      />
      <Checkout 
      modal={modal}
      setModal={setModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
      total={total}
      />
      
      <SRLWrapper>
        <Container>
      <div className="galleryContainer row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {gallery.map(image => {
          return (
            <Col key={image.id}>
              <GalleryItem image={image} />
            </Col>
          )
        })}
        </div>
        </Container>
        </SRLWrapper>
    </>
  );
}

export default Gallery;
